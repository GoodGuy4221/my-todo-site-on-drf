from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer

from .models import Project, Todo
from userapp.serializers import UserSerializer


class ProjectSerializer(HyperlinkedModelSerializer):
    users = UserSerializer(many=True)

    class Meta:
        model = Project
        fields = (
            'id',
            'url',
            'name',
            'url',
            'users',
        )


class TodoSerializer(HyperlinkedModelSerializer):
    project = ProjectSerializer()
    user = UserSerializer()

    class Meta:
        model = Todo
        fields = (
            'id',
            'url',
            'project',
            'text',
            'created_at',
            'updated_at',
            'user',
            'is_active',
        )
