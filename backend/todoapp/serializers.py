from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer

from .models import Project, Todo
from userapp.serializers import UsesModelSerializer


class ProjectSerializer(ModelSerializer):
    users = UsesModelSerializer(many=True)

    class Meta:
        model = Project
        fields = (
            # 'url',
            'id',
            'name',
            'url',
            'users',
        )


class TodoSerializer(ModelSerializer):
    project = ProjectSerializer()
    user = UsesModelSerializer()

    class Meta:
        model = Todo
        fields = (
            # 'url',
            'id',
            'project',
            'text',
            'created_at',
            'updated_at',
            'user',
            'status',
        )
