from django.shortcuts import render
from django.http import JsonResponse
from django.http import Http404

from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework import permissions,status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from .permissions import IsOwnerOrReadOnly
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .models import UserProfile
from .serializers import UserProfileSerializer, UserSerializer


@api_view(['POST'])
def registration_view(request):
  serializer = UserSerializer(data=request.data)
  if serializer.is_valid():
    user = serializer.save()
    token = Token.objects.get(user=user).key
    return Response({
      'token': token,
      'user_id': user.pk
    })
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(ModelViewSet):
  queryset = UserProfile.objects.all()
  serializer_class = UserProfileSerializer
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly]

  def has_object_permission(self, request, view, obj):
    print(obj)
    if request.method in permissions.SAFE_METHODS:
        return True

    return obj.user == request.user
  
  @action(detail=False, methods=['GET'], name='me')
  def me(self, request):
    profile = self.get_queryset().get(user=request.user)
    serializer = self.get_serializer(profile)
    return Response(serializer.data)

  