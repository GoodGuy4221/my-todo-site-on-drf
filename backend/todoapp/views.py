from django.shortcuts import render
from rest_framework.renderers import JSONRenderer, AdminRenderer
from rest_framework.viewsets import ModelViewSet

from .models import Project, Todo
from .serializers import ProjectSerializer, TodoSerializer


# Create your views here.


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class TodoViewSet(ModelViewSet):
    # renderer_classes = (JSONRenderer,)
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
