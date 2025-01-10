from django.urls import path
from .views import get_top_dramas

urlpatterns = [
    path('dramas/', get_top_dramas, name='get_top_dramas'),
]