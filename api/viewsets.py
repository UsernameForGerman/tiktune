
# libs
from rest_framework.viewsets import ViewSet, GenericViewSet
from rest_framework.request import Request
from rest_framework.response import Response
from django.db.models import Count
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_202_ACCEPTED

# project
from .models import SearchHistory, Song
from .serializers import SongSerializer, TikTokSerializer
from .tasks import find_save_songs


class SearchViewSet(ViewSet):

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
                        SearchHistory.objects.bulk_create([
                            SearchHistory(
                                tiktok_url=serializer.data['tiktok_url'],
                                song=song
                            ) for song in songs
                        ])
                        response_data = SongSerializer(songs, many=True).data
                        return Response(response_data, status=HTTP_200_OK)
                    else:
                        find_save_songs(serializer.data['tiktok_url']).delay()
                        return Response(
                            headers={
                                'retry_after': 5
                            },
                            status=HTTP_202_ACCEPTED,
                        )
            else:
                return Response('Bad link provided', status=HTTP_400_BAD_REQUEST)
        else:
            return Response('No link provided', status=HTTP_400_BAD_REQUEST)

class TrendsViewSet(ViewSet):

    def get_queryset(self, max_amount=20):
        song_ids = SearchHistory.objects.values_list('song', flat=True)
        song_amount = {}
        for song_id in song_ids:
            if song_id in song_amount.keys():
                song_amount[song_id] += 1
            else:
                song_amount[song_id] = 0
        sorted_song_amount = {k: v for k, v in sorted(song_amount.items(), key=lambda item: item[1])}
        cnt = 0
        top_ids = list()
        for key, value in sorted_song_amount.items():
            if cnt == max_amount:
                break
            top_ids.append(key)
            cnt += 1
        return Song.objects.filter(id__in=top_ids)
        # return SearchHistory.objects.all().distinct('song').annotate(Count('song', distinct=True)).order_by('-song__count')[:max_amount]

    def list(self, request: Request) -> Response:
        trends = self.get_queryset()
        response_data = SongSerializer(trends, many=True).data
        return Response(response_data, status=HTTP_200_OK)





