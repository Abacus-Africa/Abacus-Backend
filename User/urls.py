from django.urls import re_path 
from User import views 

urlpatterns = [
    re_path(r'^Users/$', views.user_list),
    re_path(r'^Users/(?P<id>[0-9]+)$', views.user_detail),
]