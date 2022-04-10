from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase, \
    CoreAPIClient
from mixer.backend.django import mixer
from django.contrib.auth import get_user_model

# from userapp.models import User
from .views import ProjectViewSet
from .models import Project, Todo

User = get_user_model()


class TestProjectViewSet(TestCase):
    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'admin'
        self.email = 'admin@admin.ru'

        self.url = '/api/projects/'
        self.admin = User.objects.create_superuser(username=self.name,
                                                   email=self.email,
                                                   password=self.password)

        self.data_create_project = {
            "name": "pr",
            "url": "http://www.pr.ru",
            "users": []
        }

        self.data_put_project = {
            "name": "up",
            "url": "http://www.up.ru",
            "users": []
        }

        self.factory = APIRequestFactory()
        self.client = APIClient()
        self.project = mixer.blend(Project)

    def test_get_list_anonymous(self) -> None:
        request = self.factory.get(self.url)
        view = ProjectViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_anonymous(self) -> None:
        request = self.factory.post(self.url, self.data_create_project, format='json')
        view = ProjectViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self) -> None:
        request = self.factory.post(self.url, self.data_create_project, format='json')
        force_authenticate(request, self.admin)
        view = ProjectViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self) -> None:
        project = mixer.blend(Project)
        response = self.client.get(f'{self.url}{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_guest(self) -> None:
        project = mixer.blend(Project)
        response = self.client.put(f'{self.url}{project.id}/', self.data_put_project)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_put_admin(self) -> None:
        project = mixer.blend(Project)
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{project.id}/', self.data_put_project)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        project_ = Project.objects.get(id=project.id)
        self.assertEqual(project_.name, self.data_put_project.get('name'))
        self.assertEqual(project_.url, self.data_put_project.get('url'))
        self.client.logout()

    def test_delete_anonymous(self) -> None:
        response = self.client.delete(f'{self.url}{self.project.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_admin(self) -> None:
        # ТАК НЕ РАБОТАЕТ
        # request = self.factory.delete(path=f'{self.url}{self.project.id}/')
        # force_authenticate(request, self.admin)
        # view = ProjectViewSet.as_view({'delete': 'destroy'})
        # print(dir(view))
        # response = view(request)
        # self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.client.login(username=self.name, password=self.password)
        response = self.client.delete(f'{self.url}{self.project.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        project = Project.objects.filter(pk=self.project.id)
        self.assertEqual(project.count(), 0)
        self.client.logout()

    def tearDown(self) -> None:
        pass


class TestTodoViewSet(APITestCase):
    def setUp(self) -> None:
        self.name = 'admin'
        self.password = 'admin'
        self.email = 'admin@admin.ru'

        self.project = mixer.blend(Project)
        self.user = mixer.blend(User)
        self.todo = mixer.blend(Todo)

        self.url = '/api/todos/'
        self.admin = User.objects.create_superuser(username=self.name, email=self.email, password=self.password)

    def test_get_list(self) -> None:
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_anonymous(self) -> None:
        response = self.client.put(f'{self.url}{self.todo.id}/', {
            'text': 'put_anonymous',
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        todo = Todo.objects.get(pk=self.todo.id)
        self.assertNotEqual(todo.text, 'put_anonymous')

    def test_post_admin(self) -> None:
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{self.todo.id}/', {
            'project': self.project.id,
            "text": "post_admin",
            'user': self.user.id,
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        new_todo_id = response.data.get('id')
        todo = Todo.objects.get(pk=new_todo_id)
        self.assertEqual(todo.text, 'post_admin')

    def test_put_admin(self) -> None:
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{self.todo.id}/', {
            "text": "put",
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        todo = Todo.objects.get(pk=self.todo.id)
        self.assertEqual(todo.text, 'put')
        self.client.logout()

    def test_delete_anonymous(self) -> None:
        todo = Todo.objects.get(pk=self.todo.id)
        self.assertEqual(todo.is_active, True)

        response = self.client.delete(f'{self.url}{self.todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        todo = Todo.objects.get(pk=self.todo.id)
        self.assertEqual(todo.is_active, True)

    def test_delete_admin(self) -> None:
        todo = Todo.objects.get(pk=self.todo.id)
        self.assertEqual(todo.is_active, True)

        self.client.login(username=self.name, password=self.password)
        response = self.client.delete(f'{self.url}{self.todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        todo = Todo.objects.get(pk=self.todo.id)
        self.assertEqual(todo.is_active, False)

    def tearDown(self) -> None:
        pass
