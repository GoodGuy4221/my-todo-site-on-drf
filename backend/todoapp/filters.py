from django_filters import rest_framework as filters

from django.utils import timezone
from datetime import timedelta

from .models import Project, Todo


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = (
            'name',
        )


class TodoFilter(filters.FilterSet):
    # min_date = filters.DateTimeFilter(field_name="create", lookup_expr='gte', input_formats=['%Y-%m-%dT%H:%M'])
    # max_date = filters.DateTimeFilter(field_name="create", lookup_expr='lte', input_formats=['%Y-%m-%dT%H:%M'])
    created_at = filters.DateFromToRangeFilter()
    # updated_at = filters.DateTimeFilter(lookup_expr='iexact')
    project__name = filters.CharFilter(field_name='project', lookup_expr='iexact')
    user__name = filters.CharFilter(field_name='user')
    is_active = filters.BooleanFilter()

    class Meta:
        model = Todo
        fields = (
            'project',
            'text',
            'created_at',
            'user',
            'is_active',
        )
