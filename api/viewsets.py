
# libs django
from rest_framework.viewsets import ViewSet
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_202_ACCEPTED,\
    HTTP_204_NO_CONTENT, HTTP_304_NOT_MODIFIED
from django.utils.timezone import datetime, timedelta

# custom libs
from json import loads, dumps
from requests import Session

# project
from .models import SearchHistory, Song
from .serializers import SongSerializer, TikTokSerializer, SearchHistorySerializer, StatsSerializer
from .tasks import find_save_songs, get_audd_songs


class SearchViewSet(ViewSet):
    MAX_HISTORY = 20

    def get_tiktok_id(self, tiktok_url):
        if 'vm.tiktok.com' in tiktok_url:
            session = Session()
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
            mobile_url = response.history[len(response.history) - 1].url

            if '/v/' in mobile_url and '.html' in mobile_url:
                post_id = mobile_url.split('/v/')[1].split('.html')[0]
            else:
                return ''
        elif "@" in tiktok_url and "/video/" in tiktok_url:
            post_id = tiktok_url.split("/video/")[1].split("?")[0]
        else:
            return ''

        print(post_id)
        return post_id

    def get_queryset(self, tiktok_id=None):
        return SearchHistory.objects.filter(
            tiktok_id=tiktok_id
        )

    def list(self, request: Request) -> Response:
        """
        Retrieve detailed Song specified by url
        """
        if 'url' in request.query_params:
            serializer = TikTokSerializer(data={
                'tiktok_url': request.query_params.get('url')
            })
            if serializer.is_valid():
                tiktok_id = self.get_tiktok_id(serializer.data['tiktok_url'])
                search_history = self.get_queryset(tiktok_id)
                if search_history.filter(song__isnull=True, finding=False):
                    return Response('Song not found', status=HTTP_404_NOT_FOUND)
                else:
                    if search_history.filter(song__isnull=False, finding=False):
                        print("get in db")
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
                        print("update")
                        query = search_history.filter(song__isnull=False, finding=True)
                        query.update(finding=False)
                        song_names = set(search.song.name for search in search_history)
                        songs = Song.objects.filter(name__in=song_names)
                        for song in songs:
                            song.amount -= 1
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
                return Response('Bad link provided', status=HTTP_400_BAD_REQUEST)
        else:
            return Response('No link provided', status=HTTP_400_BAD_REQUEST)

class TrendsViewSet(ViewSet):

    def get_queryset(self, max_amount=20):
        return Song.objects.order_by('-amount')[:max_amount]

    def list(self, request: Request) -> Response:
        songs = self.get_queryset()
        response_data = SongSerializer(songs, many=True).data
        return Response(response_data, status=HTTP_200_OK)

class HistoryViewSet(ViewSet):

    def list(self, request: Request) -> Response:
        session_data = request.session
        if 'songs' in session_data:
            print(session_data['songs'])
            search_history = SearchHistory.objects.filter(
                id__in=session_data['songs'],
            ).order_by(
                '-timestamp'
            )
            response_data = SearchHistorySerializer(search_history, many=True).data
            return Response(response_data, status=HTTP_200_OK)
        else:
            return Response('No history data in session', status=HTTP_204_NO_CONTENT)

class StatsViewSet(ViewSet):

    def list(self, request: Request) -> Response:
        search_requests = SearchHistory.objects.count()
        songs = Song.objects.count()
        response_data = StatsSerializer([{
            'search_requests': search_requests,
            'songs': songs
        }], many=True).data

        return Response(response_data, status=HTTP_200_OK)





