# django libs
from logging import log, info, warning, error, debug

# other libs
from celery import shared_task
from TikTokApi import TikTokApi
from requests import Session
import os
from acrcloud.recognizer import ACRCloudRecognizer
from json import loads, JSONDecodeError
import logging
from requests.exceptions import ConnectionError

# project
from .models import Artist, Song, SearchHistory

logger = logging.getLogger(__name__)

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
        'access_key': "8862724c406dc09588b45a0100a6ff14",
        'access_secret': "VUZkQ7vDytAxAcizRV1YzgwmZ12Mt57fyCmQkRf2",
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
    logger.info('Starting to find song url via TikTokApi')
    file_finder = TikTokApi()
    try:
        result = file_finder.getTikTokById(id=tiktok_id)
    except ConnectionError as e:
        logger.info('Connection Error occured')
        logger.warning(e)
        return ''
    try:
        mp3_url = result['itemInfo']['itemStruct']['music']['playUrl']
        logger.info('Found song url: \n {}'.format(mp3_url))
        return mp3_url
    except Exception as e:
        logger.warning(e)
        return ''

def get_audd_songs(tiktok_id):
    song_url = get_mp3_url(tiktok_id)
    if song_url != '':
        logger.info('Starting to get song info from AUDD API with {} song_url'.format(song_url))
        session = Session()
        res = session.post('https://api.audd.io/', data={
            'url': song_url,
            'return': 'apple_music,deezer,spotify',
            'market': 'ru',
            'api_token': os.environ.get('API_TOKEN', '71526d7877260531dfee40a059ca1a94')
        })
        logger.info('Song search via AUDD API is {}'.format(res.text))
        return res.text
    else:
        logger.info('Can\'t find mp3 song url')
        return ''

def find_audd(tiktok_id):
    try:
        song_info = loads(get_audd_songs(tiktok_id))
    except JSONDecodeError:
        logger.exception('Can\'t decode JSON response from AUDD API')
        try:
            search_history = SearchHistory.objects.get(tiktok_id=tiktok_id, song__isnull=True, finding=True)
            search_history.delete()
        except SearchHistory.DoesNotExist:
            pass
        return

    if song_info['status'] == "success" and song_info['result'] is not None:
        logger.info('Song with ID {} found'.format(tiktok_id))
        song = song_info['result']

        logger.info('Song info found from AUDD: \n {}'.format(song))

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
        SearchHistory.objects.update_or_create(
            tiktok_id=tiktok_id,
            song__isnull=True,
            finding=True,
            defaults={
                'song': song_obj,
            }
        )
        return True
    else:
        logger.info('Song with id {} not found in AUDD DB'.format(tiktok_id))
        SearchHistory.objects.update_or_create(
            tiktok_id=tiktok_id,
            song__isnull=True,
            finding=True,
            defaults={
                'song': None,
                'finding': False
            }
        )



@shared_task
def find_save_songs(tiktok_id: str, api='audd'):
    logger.info('Starting to find song with ID {} via {} API'.format(tiktok_id, api))
    if api == 'audd':
        return find_audd(tiktok_id)
    elif api == 'acr':
        if 'tiktok.com' in tiktok_id:
            return find_acr(tiktok_id)
        else:
            logger.warning('URL should be passed to {} API. ID {} is passed'.format(api, tiktok_id))
            raise Warning('TikTok id is not TikTok URL')
    else:
        logger.warning('API {} not implemented'.format(api))
        raise NotImplementedError('Api {} not implemented'.format(api))


