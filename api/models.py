from django.db.models import Model, URLField, CharField, SlugField, ForeignKey, CASCADE, ManyToManyField, DateTimeField, \
    BigIntegerField, Manager, SmallIntegerField

# Create your models here.

class SearchHistoryObjectsManager(Manager):
    def bulk_create(self, items, *args, **kwargs):
        super().bulk_create(items, *args, **kwargs)
        songs = Song.objects.filter(id__in=[item.song.id for item in items])
        for song in songs:
            song.amount += 1
        Song.objects.bulk_update(songs, ['amount'])

class StreamingModel(Model):
    DEEZER = 'https://deezer.com/'
    SPOTIFY = 'https://open.spotify.com/'

    deezer_id = SlugField('deezer id', max_length=64, blank=True, null=True, unique=True)
    itunes_id = SlugField('apple id', max_length=64, blank=True, null=True, unique=True)
    play_id = SlugField('play id', max_length=64, blank=True, null=True, unique=True)
    spotify_id = SlugField('spotify id', max_length=64, blank=True, null=True, unique=True)
    musicstory_id = SlugField('musicstory id', max_length=64, blank=True, null=True, unique=True)

    class Meta:
        abstract = True

    def get_deezer_url(self) -> str:
        return ''

    def get_itunes_url(self) -> str:
        return ''

    def get_play_url(self) -> str:
        return ''

    def get_spotify_url(self) -> str:
        return ''

    def get_musicstory_url(self) -> str:
        return ''

class Artist(StreamingModel):
    name = CharField('artist', max_length=256, db_index=True, unique=True)

    @classmethod
    def check_list_or_create(cls, artists):
        artist_objs = cls.objects.filter(name__in=artists).values_list('name', flat=True)
        artist_objs_to_create = list()
        artists = set(artists)
        for artist in artists:
            if artist not in artist_objs:
                artist_objs_to_create.append(
                    Artist(
                        name=artist
                    )
                )

        cls.objects.bulk_create(artist_objs_to_create)

    def __str__(self):
        return self.name

class Song(StreamingModel):
    artists = ManyToManyField(Artist, verbose_name='artists')
    name = CharField('song name', max_length=256, db_index=True, unique=True)
    image = URLField('image url', blank=True, null=True)
    amount = BigIntegerField(default=1)
    isrc = CharField('ISRC', max_length=64, null=True, blank=True)

    spotify_album_id = CharField('Spotify album id', max_length=128, blank=True, null=True)

    def __str__(self):
        return self.name

    @classmethod
    def check_list_or_create(cls, songs):
        song_objs = cls.objects.filter(name__in=songs).values_list('name', flat=True)
        song_objs_to_create = list()
        songs = set(songs)
        for song in songs:
            if song not in song_objs:
                song_objs_to_create.append(
                    Song(
                        name=song,
                        amount=1
                    )
                )

        cls.objects.bulk_create(song_objs_to_create)

    @classmethod
    def update_urls_info(cls, songs_info):
        song_objs = cls.objects.filter(name__in=[song['title'] for song in songs_info])
        song_objs_to_update = list()
        for song_info in songs_info:
            song_obj = song_objs.filter(
                name=song_info['title']
            ).first()
            if 'spotify' in song_info['external_metadata']:
                song_obj.spotify_id = song_info['external_metadata']['spotify']['track']['id']
                song_obj.spotify_album_id = song_info['external_metadata']['spotify']['album']['id']
            if 'deezer' in song_info['external_metadata']:
                song_obj.deezer_id = song_info['external_metadata']['deezer']['track']['id']
            if 'external_ids' in song_info:
                if 'isrc' in song_info['external_ids']:
                    song_obj.isrc = song_info['external_ids']['isrc']
            song_objs_to_update.append(song_obj)

        cls.objects.bulk_update(song_objs_to_update, ['spotify_id', 'deezer_id', 'isrc', 'spotify_album_id'])

    def get_deezer_url(self) -> str:
        if self.DEEZER and self.deezer_id:
            return self.DEEZER + 'track/' + self.deezer_id
        else:
            return ''

    def get_spotify_url(self) -> str:
        if self.SPOTIFY and self.spotify_id:
            return self.SPOTIFY + 'album/' + self.spotify_album_id + '?highlight=spotify:track:' + self.spotify_id
        else:
            return ''

class SearchHistory(Model):
    tiktok_url = URLField('TikTok url')
    song = ForeignKey(Song, on_delete=CASCADE, verbose_name='found song', null=True, blank=True)
    timestamp = DateTimeField(auto_now_add=True)

    objects = SearchHistoryObjectsManager()

