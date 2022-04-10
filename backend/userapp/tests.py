from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth import get_user_model

# from .models import User
from .views import UserViewSet

User = get_user_model()


class TestUserViewSet(TestCase):
    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'admin'
        self.email = 'admin@admin.ru'

        self.url = '/api/users/'
        self.admin = User.objects.create_superuser(username=self.name,
                                                   email=self.email,
                                                   password=self.password)
        self.factory = APIRequestFactory()
        self.client = APIClient()

        self.data_put = {
            'username': 'roboto',
            'email': 'roboto@roboto.ru',
            'password': '1234567890'
        }
        self.test_user = mixer.blend(User)

    def test_get_list_anonymous(self) -> None:
        request = self.factory.get(self.url)
        view = UserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_anonymous(self) -> None:
        response = self.client.put(f'{self.url}{self.test_user.id}/', self.data_put)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_put_admin(self) -> None:
        # ТАК НЕ РАБОТАЕТ
        # request = self.factory.put(path=f'{self.url}{self.test_user.id}/', data=self.data_put, format='json')
        # force_authenticate(request, self.admin)
        # view = UserViewSet.as_view({'put': 'update'})
        # response = view(request)
        # self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{self.test_user.id}/', self.data_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        user = User.objects.get(pk=self.test_user.id)
        self.assertEqual(user.username, self.data_put.get('username'))
        self.assertEqual(user.email, self.data_put.get('email'))

    def tearDown(self) -> None:
        pass
