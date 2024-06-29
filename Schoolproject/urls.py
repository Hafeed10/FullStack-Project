from django.contrib import admin
from django.urls import path, re_path
from StudentApp import views
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    re_path(r'^student$', views.studentApi),
    re_path(r'^student/([0-9]+)$', views.studentApi),
    path('admin/', admin.site.urls),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
