from django.urls import path, include
from .views import registration_view, UserViewSet
from rest_framework.routers import DefaultRouter

from rest_framework.authtoken.views import obtain_auth_token


router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
  path('users/register/',registration_view, name='register'),
  path('users/login/', obtain_auth_token, name='login'),
  path('',include(router.urls))
]
