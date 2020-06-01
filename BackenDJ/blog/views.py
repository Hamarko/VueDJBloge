from django.shortcuts import render
from blog.models import AnonimPost
from rest_framework import generics
from blog.serializers import PostSerializer

# Create your views here.

class CreatNewPostView(generics.CreateAPIView):
    serializer_class = PostSerializer  


class PostsListView(generics.ListAPIView):
    serializer_class = PostSerializer
    queryset = AnonimPost.objects.all()

class DaletUpdatePostView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    queryset = AnonimPost.objects.all()