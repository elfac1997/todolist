from django.conf.urls import url, include
from todoapp import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'tododetail', views.TodoDetailViewSet)


urlpatterns = [
    url(r'^', include(router.urls))
]