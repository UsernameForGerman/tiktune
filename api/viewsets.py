
# libs
from rest_framework.viewsets import ViewSet
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_202_ACCEPTED,\
    HTTP_204_NO_CONTENT
import datetime

# project
from .models import SearchHistory, Song
from .serializers import SongSerializer, TikTokSerializer, SearchHistorySerializer
from .tasks import find_save_songs


class SearchViewSet(ViewSet):
    MAX_HISTORY = 20

    def get_queryset(self):
        return SearchHistory.objects.filter(
            tiktok_url__iexact=self.request.query_params.get('url', '')
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
                search_history = self.get_queryset()
                if search_history.filter(song__isnull=True):
                    return Response('Song not found', status=HTTP_404_NOT_FOUND)
                else:
                    if search_history.exclude(song__isnull=True):
                        song_names = set(search.song.name for search in search_history)
                        songs = Song.objects.filter(name__in=song_names)
                        SearchHistory.objects.bulk_create([SearchHistory(
                                tiktok_url=serializer.data['tiktok_url'],
                                song=song
                            ) for song in songs
                        ])
                        now = datetime.datetime.now()
                        new_search_history = SearchHistory.objects.filter(
                            tiktok_url=serializer.data['tiktok_url'],
                            song__in=songs,
                            timestamp__range=(now - datetime.timedelta(seconds=1), now)
                        )
                        if 'songs' in request.session:
                            session_data = request.session
                            session_search_history = SearchHistory.objects.filter(
                                id__in=session_data['songs']
                            ).order_by(
                                '-timestamp'
                            )
                            while len(session_search_history) + len(new_search_history) >= self.MAX_HISTORY:
                                session_search_history.pop()
                            new_search_history = new_search_history | session_search_history
                        request.session['songs'] = [_.id for _ in new_search_history]
                        response_data = SongSerializer(songs, many=True).data
                        return Response(response_data, status=HTTP_200_OK)
                    else:
                        find_save_songs.delay(serializer.data['tiktok_url'])
                        return Response(
                            headers={
                                'retry_after': 6
                            },
                            status=HTTP_202_ACCEPTED,
                        )
            else:
                return Response('Bad link provided', status=HTTP_400_BAD_REQUEST)
        else:
            return Response('No link provided', status=HTTP_400_BAD_REQUEST)

class TrendsViewSet(ViewSet):

    def get_queryset(self, max_amount=20):
        return Song.objects.order_by('amount')[:max_amount]

    def list(self, request: Request) -> Response:
        songs = self.get_queryset()
        response_data = SongSerializer(songs, many=True).data
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
            return Response(response_data, status=HTTP_200_OK)
        else:
            return Response('No history data in session', status=HTTP_204_NO_CONTENT)





