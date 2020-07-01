
# libs django
from rest_framework.viewsets import ViewSet
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_202_ACCEPTED,\
    HTTP_204_NO_CONTENT, HTTP_304_NOT_MODIFIED
from django.shortcuts import get_object_or_404

# custom libs
from requests import Session
import logging

# project
from .models import SearchHistory, Song, Visits
from .serializers import SongSerializer, TikTokSerializer, SearchHistorySerializer, StatsSerializer
from .tasks import find_save_songs, get_audd_songs

logger = logging.getLogger(__name__)

class SearchViewSet(ViewSet):
    MAX_HISTORY = 20

    def get_tiktok_id(self, tiktok_url):
        import ssl
        ssl.match_hostname = lambda cert, hostname: True
        if 'vm.tiktok.com' in tiktok_url:
            session = Session()

            logger.info('Send request to {} to get video id from mobile url'.format(tiktok_url))
            response = session.get(tiktok_url, headers={
                "method": "GET",
                "accept-encoding": "gzip, deflate, br",
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'dnt': '1',
                'cache-control': 'max-age=0',
                'pragma': 'no-cache',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'none',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'accept-language': 'en-US,en;q=0.9'
            })
            logger.info('Response from tiktok {}'.format(response.status_code))

            mobile_url = response.url
            logger.info('Found full tiktok url {}'.format(mobile_url))
            if '/v/' in mobile_url and '.html' in mobile_url:
                post_id = mobile_url.split('/v/')[1].split('.html')[0]
            elif "@" in mobile_url and "/video/" in mobile_url:
                post_id = mobile_url.split("/video/")[1].split("?")[0]
            else:
                logger.info('Response hisotry {}'.format(response.history))
                logger.info(''.join([r.url for r in response.history]))
                logger.warning('Can\'t find video ID in mobile url')
                return ''
        elif "@" in tiktok_url and "/video/" in tiktok_url:
            post_id = tiktok_url.split("/video/")[1].split("?")[0]
        else:
            logger.warning('Not found tiktok url and video ID')
            return ''

        logger.info('Found video ID: {}'.format(post_id))
        return post_id

    def get_queryset(self, tiktok_id=None):
        return SearchHistory.objects.filter(
            tiktok_id=tiktok_id
        )

    def __not_empty_url(self, tiktok_url: str) -> bool:
        return bool(tiktok_url.split('.com/')[1])

    def list(self, request: Request) -> Response:
        """
        Retrieve detailed Song specified by url
        """
        if 'url' in request.query_params:
            serializer = TikTokSerializer(data={
                'tiktok_url': request.query_params.get('url')
            })
            if serializer.is_valid() and self.__not_empty_url(serializer.data['tiktok_url']):
                tiktok_id = self.get_tiktok_id(serializer.data['tiktok_url'])
                search_history = self.get_queryset(tiktok_id)
                logger.info('Requested song with id {}'.format(tiktok_id))
                if search_history.filter(song__isnull=True, finding=False):
                    logger.info('Song {} found in DB with \"Not Found\" result'.format(serializer.data['tiktok_url']))

                    return Response('Song not found', status=HTTP_404_NOT_FOUND)
                else:
                    if search_history.filter(song__isnull=False, finding=False):
                        logger.info('Song {} found in DB with \"Found\" result'.format(serializer.data['tiktok_url']))

                        song_names = set(search.song.name for search in search_history)
                        songs = Song.objects.filter(name__in=song_names)
                        search_history_objs = [
                            SearchHistory(
                                tiktok_id=tiktok_id,
                                song=song
                            ) for song in songs
                        ]
                        # SearchHistory.objects.bulk_create(search_history_objs)
                        for search_history_obj in search_history_objs:
                            search_history_obj.save()

                        new_search_history = SearchHistory.objects.filter(
                            id__in=[obj.id for obj in search_history_objs]
                        )
                        songs_id = list()
                        if 'songs' in request.session:
                            session_data = request.session
                            session_search_history = SearchHistory.objects.filter(
                                id__in=session_data['songs']
                            ).order_by(
                                '-timestamp'
                            )
                            for new_search_history_obj in new_search_history:
                                if len(songs_id) == self.MAX_HISTORY:
                                    break
                                songs_id.append(new_search_history_obj.id)
                            for old_search_history_obj in session_search_history:
                                if len(songs_id) == self.MAX_HISTORY:
                                    break
                                songs_id.append(old_search_history_obj.id)
                        request.session['songs'] = songs_id
                        response_data = SongSerializer(songs, many=True).data
                        return Response(response_data, status=HTTP_200_OK)
                    elif search_history.filter(song__isnull=False, finding=True):
                        logger.info('Song {} found. Updating DB'.format(serializer.data['tiktok_url']))

                        query = search_history.filter(song__isnull=False, finding=True)
                        query.update(finding=False)
                        song_names = set(search.song.name for search in search_history)
                        songs = Song.objects.filter(name__in=song_names)
                        for song in songs:
                            song.amount += 1
                        Song.objects.bulk_update(songs, ('amount',))
                        song_names = set(search.song.name for search in search_history)
                        songs = Song.objects.filter(name__in=song_names)

                        songs_id = list()
                        if 'songs' in request.session:
                            session_data = request.session
                            session_search_history = SearchHistory.objects.filter(
                                id__in=session_data['songs']
                            ).order_by(
                                '-timestamp'
                            )
                            for new_search_history_obj in query:
                                if len(songs_id) == self.MAX_HISTORY:
                                    break
                                songs_id.append(new_search_history_obj.id)
                            for old_search_history_obj in session_search_history:
                                if len(songs_id) == self.MAX_HISTORY:
                                    break
                                songs_id.append(old_search_history_obj.id)
                        request.session['songs'] = songs_id
                        response_data = SongSerializer(songs, many=True).data
                        return Response(response_data, status=HTTP_200_OK)


                    elif search_history.filter(song__isnull=True, finding=True):
                        logger.info('Song {} is still in search status'.format(serializer.data['tiktok_url']))

                        return Response(
                            headers={
                                'retry-after': 1
                            },
                            status=HTTP_202_ACCEPTED,
                            data={
                                'retry-after': 1,
                            }
                        )
                    else:
                        logger.info('Starting to find song {}'.format(serializer.data['tiktok_url']))

                        SearchHistory.objects.create(
                            finding=True,
                            song=None,
                            tiktok_id=tiktok_id
                        )
                        find_save_songs(tiktok_id)
                        return Response(
                            headers={
                                'retry-after': 1
                            },
                            status=HTTP_202_ACCEPTED,
                            data={
                                'retry-after': 1,
                            }
                        )
            else:
                logger.info('Bad link provided: {}'.format(serializer.data['tiktok_url']))

                return Response('Bad link provided', status=HTTP_400_BAD_REQUEST)
        else:
            logger.info('No link provided at all')
            return Response('No link provided', status=HTTP_400_BAD_REQUEST)

class TrendsViewSet(ViewSet):

    def get_queryset(self, max_amount=10):
        return Song.objects.order_by('-amount')[:max_amount]

    def list(self, request: Request) -> Response:
        songs = self.get_queryset()
        response_data = SongSerializer(songs, many=True).data

        logger.info('Returning list of {} trend music'.format(len(response_data)))
        return Response(response_data, status=HTTP_200_OK)

class HistoryViewSet(ViewSet):

    def list(self, request: Request) -> Response:
        session_data = request.session
        if 'songs' in session_data:
            search_history = SearchHistory.objects.filter(
                id__in=session_data['songs'],
            ).order_by(
                '-timestamp'
            )
            response_data = SearchHistorySerializer(search_history, many=True).data

            logger.info('Return {} of history'.format(len(response_data)))

            return Response(response_data, status=HTTP_200_OK)
        else:
            logger.info('No history found in session data')
            return Response('No history data in session', status=HTTP_204_NO_CONTENT)

class StatsViewSet(ViewSet):

    def list(self, request: Request) -> Response:
        search_requests = SearchHistory.objects.count()
        songs = Song.objects.count()
        visits = get_object_or_404(Visits).visits
        response_data = StatsSerializer([{
            'search_requests': search_requests,
            'songs': songs,
            'visits': visits,
        }], many=True).data

        return Response(response_data, status=HTTP_200_OK)





