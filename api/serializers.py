from rest_framework.serializers import Serializer, ImageField, CharField, URLField, ModelSerializer, IntegerField, \
    DateTimeField, SerializerMethodField, SlugField

from .models import Song, Artist, SearchHistory

class ArtistSerializer(ModelSerializer):
    class Meta:
        model = Artist
        fields = ('name',)

class SongSerializer(ModelSerializer):
    # itunes_url = URLField(read_only=True, allow_null=True, allow_blank=True, max_length=512)
    # play_url = URLField(read_only=True, allow_null=True, allow_blank=True, max_length=512)
    itunes_url = SerializerMethodField()
    play_url = SerializerMethodField()
    spotify_url = SerializerMethodField()
    deezer_url = SerializerMethodField()
    artists = ArtistSerializer(many=True, read_only=True)
    image = SerializerMethodField()

    class Meta:
        model = Song
        fields = ('artists', 'name', 'image', 'itunes_url', 'play_url', 'spotify_url', 'deezer_url', 'amount')

    def get_spotify_url(self, song):
        return song.get_spotify_url()

    def get_deezer_url(self, song):
        return song.get_deezer_url()

    def get_play_url(self, song):
        return song.get_play_url()

    def get_itunes_url(self, song):
        return song.get_itunes_url()

    def get_image(self, song):
        if song.image is not None:
            return song.image
        else:
            return ''

class TikTokSerializer(Serializer):
    tiktok_url = URLField(max_length=512)

    def is_valid(self, raise_exception=False):
        if super().is_valid():
            return 'tiktok.com' in self.data['tiktok_url']
        else:
            return False

class TrendSerializer(Serializer):
    song = SongSerializer(read_only=True)
    amount = IntegerField()

class SearchHistorySerializer(ModelSerializer):
    song = SongSerializer(read_only=True)

    class Meta:
        model = SearchHistory
        fields = ('song', 'tiktok_id', 'timestamp')

class SearchHistorySessionSerializer(Serializer):
    song = CharField(max_length=256)
    tiktok_id = SlugField()
    timestamp = DateTimeField()

class StatsSerializer(Serializer):
    search_requests = IntegerField()
    songs = IntegerField()
    visits = IntegerField()



