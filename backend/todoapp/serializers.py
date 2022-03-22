from rest_framework.serializers import ModelSerializer

from .models import Project, Todo


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = (
            'name',
            'url',
            'users',
        )


class TodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = (
            'project',
            'text',
            'created_at',
            'updated_at',
            'user',
            'status',
        )
