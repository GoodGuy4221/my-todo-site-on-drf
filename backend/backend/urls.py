"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.decorators.csrf import csrf_exempt
from rest_framework import permissions
from rest_framework.routers import DefaultRouter, SimpleRouter
from rest_framework.authtoken import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from django.views.generic import TemplateView
from graphene_django.views import GraphQLView

from userapp.views import UserViewSet
from todoapp.views import ProjectViewSet, TodoViewSet

schema_view = get_schema_view(
    openapi.Info(
        title='my-first-drf-project',
        default_version='v1',
        description='my-first-drf-project',
        contact=openapi.Contact(email='test@test.ru'),
        license=openapi.License(name='MIT')
    ),
    public=True,
    permission_classes=(permissions.AllowAny,)
)

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('projects', ProjectViewSet)
router.register('todos', TodoViewSet)

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),

    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),

    path('api-token-auth/', views.obtain_auth_token),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('swagger/', schema_view.with_ui('swagger')),
    path('swagger<str:format>', schema_view.without_ui()),
    path('redoc/', schema_view.with_ui('redoc')),

    path('swagger.json', schema_view.without_ui(), name='openapi-schema'),
    path('swagger-ui/', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='swagger-ui'),
    path('redoc-redoc/', TemplateView.as_view(
        template_name='redoc.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='redoc'),

    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=settings.DEBUG))),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
