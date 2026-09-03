FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/requirements.txt
COPY pyproject.toml uv.toml /app/
RUN pip install --no-cache-dir uv \
    && uv pip install --system -r /app/requirements.txt

COPY . /app

EXPOSE 8000 8001
