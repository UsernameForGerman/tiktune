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
        'host': "identify-eu-west-1.acrcloud.com",
        'access_key': "41b3ef28fd1208650ba1836883fe39a6",
        'access_secret': "2TLwLMyd7KpEnZyPRRXpKlCwUnmiocFbsgP63my1",
        'timeout': 10
    }

    re = ACRCloudRecognizer(config)
    buf = get_mp3_bytes_code(tiktok_url)

    return re.recognize_by_filebuffer(buf, 0)

def find_acr(tiktok_url: str):
    song_info = loads(get_songs(tiktok_url))
    if song_info['status']['msg'] == "Success":
        songs = song_info['metadata']['music']

        # create artists for song
        artists = [artist['name'] for song in songs for artist in song['artists']]
        Artist.check_list_or_create(artists)

        # create song objs with empty artist field
        song_names = [song['title'] for song in songs]
        Song.check_list_or_create(song_names)
        Song.acr_update_urls_info(songs)

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

def get_mp3_url(tiktok_url):
    print(tiktok_url)
    file_finder = TikTokApi()
    result = file_finder.getTikTokByUrl(url=tiktok_url)
    try:
        mp3_url = result['itemInfo']['itemStruct']['music']['playUrl']

        return mp3_url
    except Exception as e:
        print(e)
        return ''

def get_audd_songs(tiktok_url):
    song_url = get_mp3_url(tiktok_url)
    print("song url {}".format(song_url))
    session = Session()
    res = session.post('https://api.audd.io/', data={
        'url': song_url,
        'return': 'apple_music,deezer,spotify',
        'api_token': '71526d7877260531dfee40a059ca1a94'
    })
    print("song search result \n {}".format(res.text))
    return res.text

def find_audd(tiktok_url):
    try:
        song_info = loads(get_audd_songs(tiktok_url))
        if song_info['status'] == "success":
            song = song_info['result']
            print(song)

            # create artists for song
            artists = [song['artist']]
            Artist.check_list_or_create(artists)

            # create song objs with empty artist field
            song_names = [song['title']]
            Song.check_list_or_create(song_names)
            idx = Song.audd_update_urls_info(song)

            # update created song objs with artist field
            song_obj = Song.objects.get(id=idx)
            artist_obj = Artist.objects.get(name=song['artist'])
            song_obj.artists.add(artist_obj)

            # set song to searching history
            try:
                search_history = SearchHistory.objects.get(tiktok_url=tiktok_url, song__isnull=True)
                search_history.song = song_obj
                # search_history.finding = False
                search_history.save(update_fields=['song', 'finding'])
            except SearchHistory.DoesNotExist:
                # SearchHistory.objects.create(tiktok_url=tiktok_url, song=song_obj, finding=False)
                SearchHistory.objects.create(tiktok_url=tiktok_url, song=song_obj, finding=True)

            return True
        else:
            try:
                search_history = SearchHistory.objects.get(tiktok_url=tiktok_url, song__isnull=True)
                search_history.song = None
                search_history.finding = False
                search_history.save(update_fields=['song', 'finding'])
            except SearchHistory.DoesNotExist:
                SearchHistory.objects.create(tiktok_url=tiktok_url, song=None, finding=False)
    except Exception as e:
        print(e)
        try:
            search_history = SearchHistory.objects.get(tiktok_url=tiktok_url, song__isnull=True)
            search_history.song = None
            search_history.finding = False
            search_history.save(update_fields=['song', 'finding'])
        except SearchHistory.DoesNotExist:
            SearchHistory.objects.create(tiktok_url=tiktok_url, song=None, finding=False)


@shared_task
def find_save_songs(tiktok_url: str, api='audd'):
    if api == 'audd':
        return find_audd(tiktok_url)
    elif api == 'acr':
        return find_acr(tiktok_url)
    else:
        raise NotImplementedError('Api {} not implemented'.format(api))


