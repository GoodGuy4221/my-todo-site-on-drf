import graphene
from graphene import ObjectType, Schema, String, List, Field, Int, Mutation, ID, Boolean
from graphene_django import DjangoObjectType

from .models import Todo, Project
from userapp.models import User


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = (
            'id',
            'project',
            'text',
            'created_at',
            'updated_at',
            'user',
            'is_active',
            'status',
            '__all__'
        )


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = (
            'id',
            'name',
            'url',
            'users',
            'todo',
            '__all__'
        )


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'last_name',
            'first_name',
            'email',
            'image',
            'is_staff',
            'is_active',
            'date_joined',
            'last_login',
        )


class Query(graphene.ObjectType):
    todo_by_id = Field(TodoType, id=Int(required=False))

    def resolve_todo_by_id(root, info, id=None):
        try:
            return Todo.objects.get(id=id)
        except Todo.DoesNotExist:
            return None

    project_by_id = Field(ProjectType, id=Int(required=False))

    def resolve_project_by_id(root, info, id=None):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    user_by_id = Field(UserType, id=Int(required=False))

    def resolve_user_by_id(root, info, id=None):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None

    todos_from_user = List(TodoType, username=String(required=True))

    def resolve_todos_from_user(root, info, username):
        try:
            return Todo.objects.filter(user__username=username)
        except Todo.DoesNotExist:
            return None

    all_todo = List(TodoType)
    all_project = List(ProjectType)
    all_user = List(UserType)

    def resolve_all_todo(root, info):
        return Todo.objects.all()

    def resolve_all_project(root, info):
        return Project.objects.all()

    def resolve_all_user(root, info):
        return User.objects.all()


class TodoCreateMutation(Mutation):
    class Arguments:
        project = Int(required=True)
        text = String(required=True)
        user = Int(required=True)
        is_active = Boolean(required=False)

    todo = Field(TodoType)

    @classmethod
    def mutate(cls, root, info, project, text, user, is_active=True):
        try:
            todo = Todo.objects.create(
                project=project,
                text=text,
                user=user,
                is_active=is_active
            )
            return TodoCreateMutation(todo=todo)
        except:
            return None


class TodoUpdateMutation(Mutation):
    class Arguments:
        id = ID(required=True)
        project = Int(required=False)
        text = String(required=False)
        user = Int(required=False)
        is_active = Boolean(required=False)

    todo = Field(TodoType)

    @classmethod
    def mutate(cls, root, info, id, project=None, text=None, user=None, is_active=True):
        todo = Todo.objects.get(id=id)
        todo.project = Project.objects.get(id=project) or todo.project
        todo.text = text or todo.text
        todo.user = User.objects.get(id=user) or todo.user
        todo.is_active = is_active or todo.is_active
        todo.save()

        return TodoUpdateMutation(todo=todo)


class TodoDeleteMutation(Mutation):
    class Arguments:
        id = ID(required=True)

    todo = Field(TodoType)

    @classmethod
    def mutate(cls, root, info, id):
        Todo.objects.get(id=id).delete()
        return TodoDeleteMutation(todo=None)


class Mutations(ObjectType):
    create_todo = TodoCreateMutation.Field()
    update_todo = TodoUpdateMutation.Field()
    delete_todo = TodoDeleteMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
