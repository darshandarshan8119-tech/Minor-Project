# AgriMart Backend

This folder implements the backend scaffold from `BACKEND_ARCHITECTURE_PLAN.md`.

## Local Run

```powershell
cd "C:\Users\User\Desktop\MINI PROJECT"
docker compose up --build
```

Services:

* Django API: `http://localhost:8000`
* FastAPI realtime/AI gateway: `http://localhost:8001`
* PostgreSQL: `localhost:5432`
* Redis: `localhost:6379`

## First-Time Django Setup

```powershell
cd "C:\Users\User\Desktop\MINI PROJECT\backend"
uv sync --dev
uv run python manage.py makemigrations
uv run python manage.py migrate
uv run python manage.py createsuperuser
uv run python manage.py runserver
```

Pip fallback:

```powershell
cd "C:\Users\User\Desktop\MINI PROJECT\backend"
python -m pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Test

```powershell
cd "C:\Users\User\Desktop\MINI PROJECT\backend"
uv run pytest
uv run python manage.py check
uv run python -m compileall .
```
