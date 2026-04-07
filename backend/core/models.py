from django.db import models


class PlayerProfile(models.Model):
    username = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    avatar_url = models.URLField(blank=True, null=True)
    profile_url = models.URLField(blank=True, null=True)

    public_repos = models.IntegerField(default=0)
    followers = models.IntegerField(default=0)
    following = models.IntegerField(default=0)

    xp = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    avatar_stage = models.CharField(max_length=50, default="Beginner")

    repo_count = models.IntegerField(default=0)
    stars = models.IntegerField(default=0)

    achievements = models.JSONField(default=list, blank=True)
    quests = models.JSONField(default=list, blank=True)
    skills = models.JSONField(default=list, blank=True)
    top_languages = models.JSONField(default=list, blank=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username