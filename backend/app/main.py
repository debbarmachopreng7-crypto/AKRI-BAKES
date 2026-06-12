import json
import os
import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

STATUSES = ["Pending", "Ready For Pickup", "Completed"]


def resolve_db_path() -> str:
    candidate = os.environ.get("DB_PATH", "/data/akri.db")
    try:
        Path(candidate).parent.mkdir(parents=True, exist_ok=True)
        probe = Path(candidate).parent / ".write_test"
        probe.write_text("ok")
        probe.unlink()
        return candidate
    except OSError:
        fallback = str(Path(__file__).resolve().parent.parent / "akri.db")
        return fallback


DB_PATH = resolve_db_path()


def connect() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with connect() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS orders (
                order_id TEXT PRIMARY KEY,
                created_at TEXT NOT NULL,
                status TEXT NOT NULL,
                data TEXT NOT NULL
            )
            """
        )
        conn.commit()


class CartItem(BaseModel):
    id: Optional[str] = None
    name: str
    size: Optional[str] = ""
    price: float = 0
    quantity: int = 1
    message: Optional[str] = ""
    type: Optional[str] = None


class OrderCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = ""
    pickupDate: str
    pickupTime: str
    notes: Optional[str] = ""
    payment: str
    method: Optional[str] = "Pickup"
    deliveryArea: Optional[str] = ""
    address: Optional[str] = ""
    deliveryCharge: float = 0
    items: list[CartItem]
    total: float


class StatusUpdate(BaseModel):
    status: str


app = FastAPI(title="Akri Bakes API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


init_db()


@app.on_event("startup")
def startup() -> None:
    init_db()


@app.get("/")
def health() -> dict:
    return {"status": "ok", "service": "akri-bakes-api"}


@app.get("/orders")
def list_orders() -> list[dict]:
    with connect() as conn:
        rows = conn.execute(
            "SELECT data FROM orders ORDER BY created_at DESC"
        ).fetchall()
    return [json.loads(row["data"]) for row in rows]


@app.post("/orders")
def create_order(payload: OrderCreate) -> dict:
    created_at = datetime.now(timezone.utc).isoformat()
    items = [item.model_dump() for item in payload.items]
    has_custom = any((item.get("type") == "custom") for item in items)

    with connect() as conn:
        count = conn.execute("SELECT COUNT(*) AS c FROM orders").fetchone()["c"]
        order_id = f"AKRI-{26001 + count}"
        order = {
            "orderId": order_id,
            "name": payload.name,
            "phone": payload.phone,
            "email": payload.email or "",
            "pickupDate": payload.pickupDate,
            "pickupTime": payload.pickupTime,
            "notes": payload.notes or "",
            "payment": payload.payment,
            "method": payload.method or "Pickup",
            "deliveryArea": payload.deliveryArea or "",
            "address": payload.address or "",
            "deliveryCharge": payload.deliveryCharge or 0,
            "items": items,
            "total": payload.total,
            "status": "Pending",
            "hasCustomCake": has_custom,
            "createdAt": created_at,
        }
        conn.execute(
            "INSERT INTO orders (order_id, created_at, status, data) VALUES (?, ?, ?, ?)",
            (order_id, created_at, "Pending", json.dumps(order)),
        )
        conn.commit()
    return order


@app.patch("/orders/{order_id}")
def update_status(order_id: str, payload: StatusUpdate) -> dict:
    if payload.status not in STATUSES:
        raise HTTPException(status_code=400, detail="Invalid status")
    with connect() as conn:
        row = conn.execute(
            "SELECT data FROM orders WHERE order_id = ?", (order_id,)
        ).fetchone()
        if row is None:
            raise HTTPException(status_code=404, detail="Order not found")
        order = json.loads(row["data"])
        order["status"] = payload.status
        conn.execute(
            "UPDATE orders SET status = ?, data = ? WHERE order_id = ?",
            (payload.status, json.dumps(order), order_id),
        )
        conn.commit()
    return order
