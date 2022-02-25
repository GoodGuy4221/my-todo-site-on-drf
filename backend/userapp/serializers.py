from rest_framework.serializers import ModelSerializer

from .models import User


class UsesSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'email',
        )
