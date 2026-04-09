import requests


def calculate_level(xp):
    if xp < 200:
        return 1
    elif xp < 400:
        return 2
    elif xp < 700:
        return 3
    elif xp < 1000:
        return 4
    return 5


def calculate_avatar_stage(level):
    if level <= 2:
        return "Beginner"
    elif level <= 4:
        return "Intermediate"
    return "Advanced"


def build_achievements(repo_count, languages):
    achievements = []

    if repo_count >= 1:
        achievements.append("First Repository")
    if repo_count >= 3:
        achievements.append("Project Explorer")
    if "JavaScript" in languages:
        achievements.append("JavaScript Builder")
    if "Python" in languages:
        achievements.append("Python Builder")
    if len(languages) >= 3:
        achievements.append("Tech Explorer")

    return achievements


def build_quests(repo_count, languages):
    quests = [
        {
            "title": "Create your first public project",
            "completed": repo_count >= 1
        },
        {
            "title": "Reach at least 3 repositories",
            "completed": repo_count >= 3
        },
        {
            "title": "Use JavaScript in a project",
            "completed": "JavaScript" in languages
        },
        {
            "title": "Use Python in a project",
            "completed": "Python" in languages
        }
    ]
    return quests


def build_skills(languages):
    return [
        {
            "name": skill,
            "unlocked": True
        }
        for skill in sorted(languages)
    ]


def fetch_github_profile(username):
    user_url = f"https://api.github.com/users/{username}"
    repos_url = f"https://api.github.com/users/{username}/repos"

    user_response = requests.get(user_url, timeout=10)
    repos_response = requests.get(repos_url, timeout=10)

    if user_response.status_code != 200:
        return {"error": "GitHub user not found"}

    if repos_response.status_code != 200:
        return {"error": "Unable to fetch repositories"}

    user_data = user_response.json()
    repos_data = repos_response.json()

    repo_count = len(repos_data)
    stars = sum(repo.get("stargazers_count", 0) for repo in repos_data)

    languages = set()
    for repo in repos_data:
        language = repo.get("language")
        if language:
            languages.add(language)

    xp = repo_count * 40 + min(stars, 20) * 10 + len(languages) * 30
    level = calculate_level(xp)
    avatar_stage = calculate_avatar_stage(level)
    achievements = build_achievements(repo_count, languages)
    quests = build_quests(repo_count, languages)
    skills = build_skills(languages)

    return {
        "username": user_data.get("login"),
        "name": user_data.get("name"),
        "avatar_url": user_data.get("avatar_url"),
        "public_repos": user_data.get("public_repos"),
        "followers": user_data.get("followers"),
        "following": user_data.get("following"),
        "profile_url": user_data.get("html_url"),
        "xp": xp,
        "level": level,
        "avatar_stage": avatar_stage,
        "achievements": achievements,
        "quests": quests,
        "skills": skills,
        "top_languages": sorted(list(languages)),
        "repo_count": repo_count,
        "stars": stars,
    }