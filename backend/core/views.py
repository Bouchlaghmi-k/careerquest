from rest_framework.response import Response
from rest_framework.decorators import api_view
from .github_service import fetch_github_profile
from .models import PlayerProfile
from .serializers import PlayerProfileSerializer


@api_view(["GET"])
def health_check(request):
    return Response({
        "message": "CareerQuest backend is running",
        "status": "success"
    })


@api_view(["GET"])
def github_profile_view(request, username):
    data = fetch_github_profile(username)

    if "error" in data:
        return Response(data, status=404)

    profile, created = PlayerProfile.objects.update_or_create(
        username=data["username"],
        defaults={
            "name": data.get("name"),
            "avatar_url": data.get("avatar_url"),
            "profile_url": data.get("profile_url"),
            "public_repos": data.get("public_repos", 0),
            "followers": data.get("followers", 0),
            "following": data.get("following", 0),
            "xp": data.get("xp", 0),
            "level": data.get("level", 1),
            "avatar_stage": data.get("avatar_stage", "Beginner"),
            "repo_count": data.get("repo_count", 0),
            "stars": data.get("stars", 0),
            "achievements": data.get("achievements", []),
            "quests": data.get("quests", []),
            "skills": data.get("skills", []),
            "top_languages": data.get("top_languages", []),
        }
    )

    serializer = PlayerProfileSerializer(profile)
    return Response(serializer.data)


@api_view(["GET"])
def leaderboard_view(request):
    players = PlayerProfile.objects.order_by("-xp")[:10]
    serializer = PlayerProfileSerializer(players, many=True)
    return Response(serializer.data)