from fastapi import APIRouter, HTTPException
from datetime import datetime, timedelta
from jose import jwt
from database import auth_collection
from pydantic import BaseModel


router = APIRouter()

SECRET_KEY = "college_secret_key"


class AuthUser(BaseModel):
    username: str
    password: str
    role: str


# ================= REGISTER =================

@router.post("/register")
def register(user: AuthUser):

    existing = auth_collection.find_one(
        {"username": user.username}
    )

    if existing:

        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    auth_collection.insert_one(dict(user))

    return {"message": "Registered successfully"}


# ================= LOGIN =================

@router.post("/login")
def login(user: AuthUser):

    db_user = auth_collection.find_one(
        {"username": user.username}
    )

    if not db_user or db_user["password"] != user.password:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = jwt.encode(

        {
            "username": user.username,
            "role": db_user["role"],
            "exp": datetime.utcnow() + timedelta(hours=2),
        },

        SECRET_KEY,
        algorithm="HS256",

    )

    return {

        "access_token": token,
        "role": db_user["role"]

    }