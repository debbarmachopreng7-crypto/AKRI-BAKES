import json
import os
import random
import smtplib
import sqlite3
import string
import time
from datetime import datetime, timezone
from email.mime.text import MIMEText
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

STATUSES = ["Awaiting Payment Confirmation", "Pending", "Ready For Pickup", "Completed", "Cancelled"]

# ── OTP in-memory store ──────────────────────────────────────────
otp_store: dict[str, dict] = {}

SMTP_EMAIL = os.environ.get("SMTP_EMAIL", "akribakes2020@gmail.com")
SMTP_PASS = os.environ.get("SMTP_PASSWORD", "")
ADMIN_EMAIL = "akribakes2020@gmail.com"
ADMIN_PHONE = "8259917757"


def generate_otp() -> str:
    return str(random.randint(100000, 999999))


def send_otp_email(recipient: str, otp: str) -> bool:
    if not SMTP_PASS:
        return False
    try:
        msg = MIMEText(
            f"Your OTP for Akri Bakes admin access is: {otp}\n\n"
            f"This OTP expires in 5 minutes.\n\n"
            f"If you did not request this, please ignore."
        )
        msg["Subject"] = "Admin OTP — Akri Bakes"
        msg["From"] = f"Akri Bakes Admin <{SMTP_EMAIL}>"
        msg["To"] = recipient

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(SMTP_EMAIL, SMTP_PASS)
            server.send_message(msg)
        return True
    except Exception as exc:
        print(f"Email send failed: {exc}")
        return False


# ── Database ─────────────────────────────────────────────────────
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


# ── Pydantic models ──────────────────────────────────────────────
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


class OTPSendRequest(BaseModel):
    email: Optional[str] = None
    phone: Optional[str] = None


class OTPVerifyRequest(BaseModel):
    email: Optional[str] = None
    phone: Optional[str] = None
    otp: str


# ── FastAPI app ──────────────────────────────────────────────────
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
@app.get("/api/healthz")
def health() -> dict:
    return {"status": "ok", "service": "akri-bakes-api"}


# ── OTP endpoints ────────────────────────────────────────────────
@app.post("/api/otp/send")
def otp_send(payload: OTPSendRequest) -> dict:
    identifier = payload.email or payload.phone
    if not identifier:
        raise HTTPException(status_code=400, detail="Email or phone is required.")

    if payload.email and payload.email.lower() != ADMIN_EMAIL.lower():
        raise HTTPException(status_code=403, detail="Unauthorized email.")
    if payload.phone and payload.phone != ADMIN_PHONE:
        raise HTTPException(status_code=403, detail="Unauthorized phone.")

    otp = generate_otp()
    otp_store[identifier] = {"otp": otp, "expires_at": time.time() + 300, "attempts": 0}

    sent = False
    if payload.email:
        sent = send_otp_email(payload.email, otp)

    return {
        "success": True,
        "message": f"OTP sent to {identifier}",
        "email_sent": sent,
        # In dev (no SMTP), return OTP so it can be shown
        **({"otp": otp, "warning": "SMTP not configured — OTP shown for development."} if not sent else {}),
    }


@app.post("/api/otp/verify")
def otp_verify(payload: OTPVerifyRequest) -> dict:
    identifier = payload.email or payload.phone
    if not identifier or not payload.otp:
        raise HTTPException(status_code=400, detail="Email/phone and OTP are required.")

    record = otp_store.get(identifier)
    if not record:
        raise HTTPException(status_code=401, detail="No OTP requested. Request a new one.")

    if time.time() > record["expires_at"]:
        otp_store.pop(identifier, None)
        raise HTTPException(status_code=401, detail="OTP expired. Request a new one.")

    if record["attempts"] >= 5:
        otp_store.pop(identifier, None)
        raise HTTPException(status_code=401, detail="Too many failed attempts. Request a new OTP.")

    record["attempts"] += 1
    if record["otp"] != payload.otp:
        raise HTTPException(status_code=401, detail="Incorrect OTP. Try again.")

    otp_store.pop(identifier, None)
    return {"success": True, "message": "OTP verified successfully."}


# ── Order endpoints ──────────────────────────────────────────────
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
            "status": payload.status if hasattr(payload, 'status') else "Pending",
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
