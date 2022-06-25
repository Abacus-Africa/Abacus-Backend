import imp
from django.shortcuts import render
from rest_framework import status
from .models import Users
from .serializers import Userserializer
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET':
        user = Users.objects.all()
        user_serializer = Userserializer(user, many=True)
        return Response(user_serializer.data)

    elif request.method == 'POST':
        user_serializer = Userserializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)

        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, id):
    try:
        user = Users.objects.get(id=id)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        user_serializer = Userserializer(user)
        return Response(user_serializer.data)
    elif request.method == 'PUT':
        user_serializer = Userserializer(user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data)
        return Response(user_serializer.error, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)





