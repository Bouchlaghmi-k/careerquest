from rest_framework.response import Response
from rest_framework.decorators import api_view
from .github_service import fetch_github_profile


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

    return Response(data)