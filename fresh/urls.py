from django.conf.urls import patterns, url

from .views import fresh


urlpatterns = patterns('',
    url(r'^__fresh__/$', fresh, name='fresh'),
)

