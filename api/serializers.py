from rest_framework.serializers import Serializer, ImageField, CharField, URLField, ModelSerializer, ReadOnlyField
from .models import Song, Artist

class ArtistSerializer(ModelSerializer):
    class Meta:
        model = Artist
        fields = ('name',)

class SongSerializer(ModelSerializer):
    itunes_url = URLField(read_only=True, allow_null=True, allow_blank=True, max_length=512)
    play_url = URLField(read_only=True, allow_null=True, allow_blank=True, max_length=512)
    artists = ArtistSerializer(many=True, read_only=True)

    class Meta:
        model = Song
        fields = ('artists', 'name', 'image', 'itunes_url', 'play_url')

class TikTokSerializer(Serializer):
    tiktok_url = URLField(max_length=512)

    def is_valid(self, raise_exception=False):
        if super().is_valid():
            return 'tiktok.com' in self.data['tiktok_url']
        else:
            return False

