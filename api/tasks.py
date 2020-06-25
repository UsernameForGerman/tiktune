# libs
from celery import shared_task
from TikTokApi import TikTokApi
from requests import Session
import os
from acrcloud.recognizer import ACRCloudRecognizer
from json import loads

# project
from .models import Artist, Song, SearchHistory

# tiktoks = [
#     'https://www.tiktok.com/@klavacoca/video/6840496942951255301',
#     'https://www.tiktok.com/@katrin_pavlin/video/6830056543883496710',
#     'https://www.tiktok.com/@elizabethcisneros436/video/6840935246611893509',
#     'https://www.tiktok.com/@ramdeep.osahan/video/6841108885219151109',
#     'https://www.tiktok.com/@rambllive/video/6831594006460304645',
#     'https://www.tiktok.com/@ennie_yoyki/video/6825727255851928838',
#     'https://www.tiktok.com/@natan_blackstar/video/6839784407356804357',
#     'https://www.tiktok.com/@sanchiii09/video/6818934575801060610',
#     'https://www.tiktok.com/@bitovuxa/video/6824837332064079110',
# ]


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

def get_mp3_url(tiktok_id):
    print(tiktok_id)
    file_finder = TikTokApi()
    result = file_finder.getTikTokById(id=tiktok_id)
    try:
        mp3_url = result['itemInfo']['itemStruct']['music']['playUrl']

        return mp3_url
    except Exception as e:
        print(e)
        return ''

def get_audd_songs(tiktok_id):
    song_url = get_mp3_url(tiktok_id)
    print("song url {}".format(song_url))
    session = Session()
    res = session.post('https://api.audd.io/', data={
        'url': song_url,
        'return': 'apple_music,deezer,spotify',
        'market': 'ru',
        'api_token': '71526d7877260531dfee40a059ca1a94'
    })
    print("song search result \n {}".format(res.text))
    return res.text

def find_audd(tiktok_id):
    try:
        song_info = loads(get_audd_songs(tiktok_id))
        if song_info['status'] == "success" and song_info['result'] is not None:
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
                search_history = SearchHistory.objects.get(tiktok_id=tiktok_id, song__isnull=True, finding=True)
                search_history.song = song_obj
                # search_history.finding = False
                search_history.save(update_fields=['song', 'finding'])
            except SearchHistory.DoesNotExist:
                SearchHistory.objects.create(tiktok_id=tiktok_id, song=song_obj, finding=True)

            return True
        else:
            try:
                search_history = SearchHistory.objects.get(tiktok_id=tiktok_id, song__isnull=True, finding=True)

                search_history.song = None
                search_history.finding = False
                search_history.save(update_fields=['song', 'finding'])
            except SearchHistory.DoesNotExist:
                SearchHistory.objects.create(tiktok_id=tiktok_id, song=None, finding=False)
    except Exception as e:
        print(e)
        try:
            search_history = SearchHistory.objects.get(tiktok_id=tiktok_id, song__isnull=True, finding=True)
            search_history.delete()
        except SearchHistory.DoesNotExist:
            pass
        #     search_history.song = None
        #     search_history.finding = False
        #     search_history.save(update_fields=['song', 'finding'])
        # except SearchHistory.DoesNotExist:
        #     SearchHistory.objects.create(tiktok_url=tiktok_url, song=None, finding=False)


@shared_task
def find_save_songs(tiktok_id: str, api='audd'):
    if api == 'audd':
        return find_audd(tiktok_id)
    elif api == 'acr':
        if 'tiktok.com' in tiktok_id:
            return find_acr(tiktok_id)
        else:
            raise Warning('TikTok id is not TikTok URL')
    else:
        raise NotImplementedError('Api {} not implemented'.format(api))


