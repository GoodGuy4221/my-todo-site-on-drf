from django.core.management import BaseCommand
from mixer.backend.django import mixer

from todoapp.models import Project, Todo


class Command(BaseCommand):
    help = 'Fill db projects and todos'

    def handle(self, *args, **kwargs):
        for _ in range(5):
            # mixer.blend(Project)
            mixer.blend(Todo)
        print('done!')
