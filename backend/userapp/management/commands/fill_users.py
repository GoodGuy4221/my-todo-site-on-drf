from django.core.management.base import BaseCommand

from userapp.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        admin = User.objects.filter(username='admin')
        if not admin:
            User.objects.create_superuser(username='admin',
                                          email='admin@mail.ru',
                                          password='admin')
            print('created user admin')
        else:
            print('user admin already exists')

        varick = User.objects.filter(username='varick')
        if not varick:
            User.objects.create_user(username='varick',
                                     email='varick@mail.ru',
                                     password='varick')
            print('created user varick')
        else:
            print('user varick already exists')

        bond = User.objects.filter(username='bond')
        if not bond:
            User.objects.create_user(username='bond',
                                     email='bond@mail.ru',
                                     password='bond')
            print('created user bond')
        else:
            print('user bond already exists')
