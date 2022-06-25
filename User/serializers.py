from pyexpat import model
from rest_framework import serializers 
from .models import Users

class Userserializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'firstname', 'lastname','email', 'phone', 'address']