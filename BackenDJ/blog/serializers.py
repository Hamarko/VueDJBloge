from rest_framework import serializers
from blog.models import AnonimPost

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnonimPost
        fields = '__all__'
