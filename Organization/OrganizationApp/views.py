from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Person
from .serializer import PersonSerializer

class PersonViewset(ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
