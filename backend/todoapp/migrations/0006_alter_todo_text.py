# Generated by Django 3.2.12 on 2022-04-09 06:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todoapp', '0005_alter_project_users'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='text',
            field=models.TextField(max_length=1000, verbose_name='текст заметки'),
        ),
    ]
