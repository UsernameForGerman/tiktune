# libs
from celery import shared_task
from TikTokApi import TikTokApi
from requests import Session
import os
from acrcloud.recognizer import ACRCloudRecognizer
from json import loads

# project
from .models import Artist, Song, SearchHistory

def get_mp3_bytes_code(tiktok_url):
    file_finder = TikTokApi()
    result = file_finder.getTikTokByUrl(url=tiktok_url)
    mp3_url = result['itemInfo']['itemStruct']['music']['playUrl']
    session = Session()
    result = session.get(mp3_url).content
    session.close()
    return result

def get_songs(tiktok_url):
    config = {
        'host': os.environ.get("ACR_HOST"),
        'access_key': os.environ.get("ACR_ACCESS_KEY"),
        'access_secret': os.environ.get("ACR_ACCESS_SECRET"),
        'timeout': 5
    }

    re = ACRCloudRecognizer(config)
    buf = get_mp3_bytes_code(tiktok_url)

    return re.recognize_by_filebuffer(buf, 0)

@shared_task
def find_save_songs(tiktok_url: str):
    song_info = loads(get_songs(tiktok_url))
    if song_info['status']['msg'] == "Success":
        songs = song_info['metadata']['music']

        # create artists for song
        artists = [artist['name'] for song in songs for artist in song['artists']]
        Artist.check_list_or_create(artists)

        # create song objs with empty artist field
        song_names = [song['title'] for song in songs]
        Song.check_list_or_create(song_names)
        Song.update_urls_info(songs)

        # update created song objs with artist field
        song_objs = Song.objects.filter(name__in=song_names)
        for song_obj in song_objs:
            artists = set(artist['name'] for song in songs for artist in song['artists'] if song['title'] == song_obj.name)
            song_obj.artists.add(*Artist.objects.filter(name__in=artists))

        # set song to searching history
        for song_obj in song_objs:
            try:
                search_history = SearchHistory.objects.get(tiktok_url=tiktok_url, song__isnull=True)
                search_history.song = song_obj
                search_history.save(update_fields=['song'])
            except SearchHistory.DoesNotExist:
                SearchHistory.objects.create(tiktok_url=tiktok_url, song=song_obj)
