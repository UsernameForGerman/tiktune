from django.db.models.signals import post_save, pre_delete, pre_save
from django.dispatch import receiver
from .models import SearchHistory, Song

@receiver(post_save, sender=SearchHistory)
def increment_song_search_amount(sender, instance, **kwargs):
    if instance.song is not None:
        song = instance.song
        song.amount += 1
        song.save()
