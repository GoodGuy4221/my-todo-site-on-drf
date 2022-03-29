from django.shortcuts import render
from rest_framework.renderers import JSONRenderer, AdminRenderer
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status

from .filters import ProjectFilter, TodoFilter
from .models import Project, Todo
from .serializers import ProjectSerializer, TodoSerializer
from .paginations import ProjectPagination, TodoPagination


# Create your views here.


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectPagination
    # filterset_fields = ('name',)
    filterset_class = ProjectFilter

    # def get_queryset(self):
    #     partname = self.request.query_params.get('partname', '')
    #     if partname:
    #         project = Project.objects.filter(name__contains=partname)
    #     else:
    #         project = Project.objects.all()
    #     return project


class TodoViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    pagination_class = TodoPagination
    filterset_class = TodoFilter

    def destroy(self, request, *args, **kwargs):
        if obj := self.get_object():
            if not obj.status == 'C':
                obj.status = 'C'
                obj.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
