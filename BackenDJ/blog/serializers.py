from rest_framework import serializers
from blog.models import AnonimPost,GrafPower

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnonimPost
        fields = '__all__'
class GrafPowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = GrafPower
        fields = '__all__'

