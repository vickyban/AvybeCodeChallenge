from rest_framework import serializers
from .models import UserProfile

from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
  password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
  class Meta:
    model = User
    fields = ['id','username', 'password', 'password2']
    extra_kwargs={
      'password':{'write_only':True}
    }

  def create(self, validated_data):
    password = validated_data['password']
    password2 = validated_data['password2']
    if password != password2:
      raise serializers.ValidationError({'password': 'Passwords must match'})

    username = validated_data['username']
    user = User.objects.create(username=username)
    user.set_password(password)
    user.save()
    profile = UserProfile.objects.create(user=user, nickname=username)
    profile.save()
    return user


class UserProfileSerializer(serializers.ModelSerializer):
  id = serializers.ReadOnlyField(source='user.id')
  user = UserSerializer(read_only=True)
  class Meta:
    model = UserProfile
    fields = ('id','nickname', 'avatar','user')