from django.urls import path
from .views import health_check, github_profile_view, leaderboard_view

urlpatterns = [
    path("health/", health_check, name="health_check"),
    path("github/<str:username>/", github_profile_view, name="github_profile_view"),
    path("leaderboard/", leaderboard_view, name="leaderboard_view"),
]