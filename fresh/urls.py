from django.conf.urls import url

from .views import fresh

urlpatterns = [
    url(r'^__fresh__/$', fresh, name='fresh'),
]
