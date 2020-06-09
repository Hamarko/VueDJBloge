from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class AnonimPost(models.Model):
    title = models.CharField(verbose_name='title', db_index=True, max_length=64)
    body = models.CharField(verbose_name='body', max_length=2048)

class UserPost(models.Model):    
    title = models.CharField(verbose_name='title', db_index=True, max_length=64)
    body = models.CharField(verbose_name='body', max_length=512)
    user = models.ForeignKey(User, verbose_name='body', on_delete=models.CASCADE)

class GrafPower(models.Model):
    time = models.CharField(verbose_name='time', db_index=True, max_length=64)
    activPower = models.CharField(verbose_name='activ_power', db_index=True, max_length=64)
    reactivPower = models.CharField(verbose_name=' reactiv_power', db_index=True, max_length=64)




# Create your models here.
