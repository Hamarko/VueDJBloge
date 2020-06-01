from django.db import models

class AnonimPost(models.Model):
    title = models.CharField(verbose_name='title', db_index=True, max_length=64)
    body = models.CharField(verbose_name='body', max_length=2048)

# Create your models here.
