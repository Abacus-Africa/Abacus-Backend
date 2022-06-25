from django.db import models

# Create your models here.
class  Users(models.Model):
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    address = models.CharField(max_length=255)

    def __str__(self):
        return self.firstname+ ' ' + self.lastname