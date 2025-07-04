# Autonomous Agent Backend

## Development

```bash
cd autonomous-agent-backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API will be available at `http://localhost:8000`.

## Environment Variables

Copy `.env.example` to `.env` and configure values.

## Docker

```bash
docker-compose up --build
```