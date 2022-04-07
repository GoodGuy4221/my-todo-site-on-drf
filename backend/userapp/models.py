from django.db import models

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(verbose_name='email', unique=True, db_index=True)
    image = models.ImageField(verbose_name='фото', upload_to='users/%Y/%m/%d/', default='user.png')

    def __str__(self):
        return f'{self.username} {self.first_name} {self.last_name}'

    def delete(self, using=None, keep_parents=False):
        if self.is_active:
            self.is_active = False
            self.save()
