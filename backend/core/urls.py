from django.urls import path
from .views import health_check, github_profile_view

urlpatterns = [
    path("health/", health_check, name="health_check"),
    path("github/<str:username>/", github_profile_view, name="github_profile_view"),
]