from django.urls import path, include
from blog.views import *

app_name = 'post'
urlpatterns = [
    path('create/', CreatNewPostView.as_view()),
    path('all/', PostsListView.as_view()),
    path('update/<int:pk>/', DaletUpdatePostView.as_view())
]