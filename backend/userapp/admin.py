from django.contrib import admin

from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    # list_display = (
    #     'id',
    #     'username',
    #     'first_name',
    #     'last_name',
    #     'email',
    #     'is_active',
    # )
    # list_display = '__all__'
    # list_display_links = (
    #     'id',
    #     'username',
    # )
    # search_fields = (
    #     'username',
    #     'email',
    # )
    # list_editable = (
    #     'is_active',
    # )
    # list_filter = (
    #     'is_active',
    # )
    pass
