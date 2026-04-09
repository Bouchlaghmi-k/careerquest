import re
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


def slugify(value):
    return re.sub(r"[^a-zA-Z0-9]+", "-", value.lower()).strip("-")


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


def build_general_quests(repo_count, stars, languages_count):
    return [
        {
            "id": "general-1",
            "unit": "general",
            "unit_label": "Défis généraux",
            "level": 1,
            "title": "Créer un premier dépôt public",
            "completed": repo_count >= 1,
            "current": repo_count,
            "target": 1,
        },
        {
            "id": "general-2",
            "unit": "general",
            "unit_label": "Défis généraux",
            "level": 2,
            "title": "Atteindre au moins 3 dépôts",
            "completed": repo_count >= 3,
            "current": repo_count,
            "target": 3,
        },
        {
            "id": "general-3",
            "unit": "general",
            "unit_label": "Défis généraux",
            "level": 3,
            "title": "Obtenir au moins 5 étoiles",
            "completed": stars >= 5,
            "current": stars,
            "target": 5,
        },
        {
            "id": "general-4",
            "unit": "general",
            "unit_label": "Défis généraux",
            "level": 4,
            "title": "Utiliser au moins 3 technologies différentes",
            "completed": languages_count >= 3,
            "current": languages_count,
            "target": 3,
        },
    ]


def build_skill_quests(language_repo_counts):
    quests = []

    for language in sorted(language_repo_counts.keys()):
        count = language_repo_counts[language]
        unit_key = f"skill-{slugify(language)}"
        unit_label = f"Parcours {language}"

        quests.extend([
            {
                "id": f"{unit_key}-1",
                "unit": unit_key,
                "unit_label": unit_label,
                "level": 1,
                "title": f"Publier un premier dépôt en {language}",
                "completed": count >= 1,
                "current": count,
                "target": 1,
            },
            {
                "id": f"{unit_key}-2",
                "unit": unit_key,
                "unit_label": unit_label,
                "level": 2,
                "title": f"Atteindre 2 dépôts en {language}",
                "completed": count >= 2,
                "current": count,
                "target": 2,
            },
            {
                "id": f"{unit_key}-3",
                "unit": unit_key,
                "unit_label": unit_label,
                "level": 3,
                "title": f"Construire une spécialisation en {language}",
                "completed": count >= 3,
                "current": count,
                "target": 3,
            },
        ])

    return quests


def build_quests(repo_count, stars, language_repo_counts):
    general_quests = build_general_quests(repo_count, stars, len(language_repo_counts))
    skill_quests = build_skill_quests(language_repo_counts)
    return general_quests + skill_quests


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

    language_repo_counts = {}
    for repo in repos_data:
        language = repo.get("language")
        if language:
            language_repo_counts[language] = language_repo_counts.get(language, 0) + 1

    languages = set(language_repo_counts.keys())

    xp = repo_count * 40 + min(stars, 20) * 10 + len(languages) * 30
    level = calculate_level(xp)
    avatar_stage = calculate_avatar_stage(level)
    achievements = build_achievements(repo_count, languages)
    quests = build_quests(repo_count, stars, language_repo_counts)
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