from django.db import models

from userapp.models import User


# Create your models here.


class Project(models.Model):
    name = models.CharField(max_length=128, unique=True, verbose_name='название')
    url = models.URLField(max_length=128, blank=True, verbose_name='ссылка на репозиторий')
    users = models.ManyToManyField(User, verbose_name='набор пользователей')

    def __str__(self):
        return self.name


class Todo(models.Model):
    ACTIVE = 'A'
    INACTIVE = 'I'
    FORMING = 'V'
    CLOSED = 'C'

    TODO_STATUS_CHOICES = (
        (ACTIVE, 'активна'),
        (INACTIVE, 'неактивна'),
        (FORMING, 'формируется'),
        (CLOSED, 'закрыто'),
    )

    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name='проект в котором сделана заметка')
    text = models.TextField(verbose_name='текст заметки')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='дата-время создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='дата-время обновления')
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='пользователь создавший заметку')
    status = models.CharField(verbose_name='статус заметки', max_length=1, choices=TODO_STATUS_CHOICES, default=ACTIVE)

    def __str__(self):
        return f'{self.project} {self.status}'

    # def delete(self, using=None, keep_parents=False):
    #     if not self.status == 'C':
    #         self.status = 'C'
    #         self.save()
