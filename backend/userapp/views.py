from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet

from .models import User
from .serializers import UsesModelSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsesModelSerializer
