# Akri Bakes Backend (Order API)

A small FastAPI service that stores cake orders centrally in a SQLite database, so
every order placed on the site lands in one place and shows up in the Admin dashboard
from any device.

## Endpoints

- `GET /` — health check
- `GET /orders` — list all orders (newest first)
- `POST /orders` — create an order; the server assigns the next `AKRI-#####` id
- `PATCH /orders/{order_id}` — update status (`Pending`, `Ready For Pickup`, `Completed`)

## Run locally

```bash
cd backend
python -m venv .venv
. .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install fastapi "uvicorn[standard]"
uvicorn app.main:app --reload --port 8000
```

The database file location can be set with the `DB_PATH` env var (defaults to
`/data/akri.db` if writable, otherwise `backend/akri.db`).

## Connect the frontend

Set `NEXT_PUBLIC_API_URL` to the backend's public URL before building the site:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-url npm run build
```

If `NEXT_PUBLIC_API_URL` is not set, the site falls back to per-browser
`localStorage` (no central storage).

## Deploy (durable hosting)

This app deploys as-is to any Python host. Recommended free options:

- **Render**: New → Web Service → connect this repo → root dir `backend` →
  build `pip install -r <(echo fastapi uvicorn[standard])` or use a `requirements.txt` →
  start `uvicorn app.main:app --host 0.0.0.0 --port $PORT`. Add a persistent disk
  mounted at `/data` so orders survive restarts.
- **Railway / Fly.io**: same start command; attach a volume at `/data`.
