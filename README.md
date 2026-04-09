# CareerQuest

CareerQuest est une application web gamifiée qui transforme l’activité GitHub d’un utilisateur en progression de carrière visible et motivante.

À partir d’un nom d’utilisateur GitHub, l’application analyse les données publiques du profil et génère automatiquement :

- de l’XP
- un niveau
- un stade d’évolution
- des succès
- des défis
- des compétences détectées
- un classement global

## Objectif

Le but de CareerQuest est de rendre la progression technique d’un étudiant ou d’un développeur plus lisible, plus engageante et plus valorisante, en s’inspirant des mécaniques du jeu vidéo.

## Fonctionnalités principales

- Analyse d’un profil GitHub public
- Génération d’un profil gamifié
- Tableau de bord dynamique
- Défis organisés par unités
- Compétences détectées à partir du profil réel
- Classement basé sur les profils enregistrés
- Interface moderne et responsive
- Architecture conteneurisée avec Docker

## Stack technique

### Frontend
- React
- React Router
- CSS personnalisé

### Backend
- Python
- Django
- Django REST Framework

### Base de données
- PostgreSQL

### DevOps / Infra
- Docker
- Docker Compose
- GitLab CI/CD (minimum viable)

## Architecture

Le projet repose sur 3 services principaux :

- `frontend` : interface utilisateur React
- `backend` : API Django REST
- `db` : base de données PostgreSQL

Le frontend communique avec le backend via API, et le backend :
- récupère les données GitHub publiques
- calcule la progression utilisateur
- enregistre les profils analysés en base
- alimente le classement

## Lancement du projet en local

### Prérequis
- Git
- Docker Desktop

### Cloner le projet
```bash
git clone -b main https://github.com/Bouchlaghmi-k/careerquest.git
cd careerquest