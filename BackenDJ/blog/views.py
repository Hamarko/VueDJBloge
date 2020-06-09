from django.shortcuts import render
from blog.models import AnonimPost, GrafPower
from rest_framework import generics
from blog.serializers import PostSerializer,GrafPowerSerializer
from rest_framework.permissions import IsAuthenticated


# Create your views here.

class CreatNewPostView(generics.CreateAPIView):
    serializer_class = PostSerializer  


class PostsListView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PostSerializer
    queryset = AnonimPost.objects.all()
   

class DaletUpdatePostView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    queryset = AnonimPost.objects.all()

    
class GrafPowerListView(generics.ListAPIView):
    serializer_class = GrafPowerSerializer
    queryset = GrafPower.objects.all()
