from django.db import models
from django.conf import settings
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User

def upload_loaction(instance, filename, **kwargs):
  file_path = 'avatars/{user_id}-{filename}'.format(
    user_id=str(instance.user.id),
    filename=filename
  )
  return file_path
class UserProfile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE, null=False, primary_key=True)
  nickname = models.CharField(max_length=100, null=True, blank=True)
  avatar = models.ImageField(_('Image'),default='avatars/default.jpg', upload_to=upload_loaction)

  def __str__(self):
    return self.nickname

@receiver(post_delete, sender=settings.AUTH_USER_MODEL)
def user_delete(sender, instance, **kwargs):
  instance.image.delete(False)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
  if created:
    Token.objects.create(user=instance)