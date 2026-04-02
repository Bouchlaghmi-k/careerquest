# CareerQuest

CareerQuest is a gamified career development platform where students level up their avatar by completing quests, unlocking skills, and gaining achievements.

## Base architecture

- `frontend/` : React frontend
- `backend/` : Django REST API
- `infra/` : container and deployment configuration
- `docs/` : diagrams, notes, documentation
- `docker-compose.yml` : multi-service local orchestration
- `.gitlab-ci.yml` : GitLab CI/CD pipeline

## Constraints

- containerized architecture with Docker
- minimum 3 services: frontend, backend, database
- GitLab CI/CD pipeline
- deployed and accessible application
- modern responsive UI

## Team workflow

- `main` = stable branch
- each member works on a feature branch
- changes are merged through pull requests