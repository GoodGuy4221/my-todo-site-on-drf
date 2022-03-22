from django.contrib import admin

from .models import Project, Todo


# Register your models here.


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    pass


@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    pass
