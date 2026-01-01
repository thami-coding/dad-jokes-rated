import os
from datetime import datetime, timedelta
from typing import Optional

from fastapi import HTTPException, Request, status
from passlib.context import CryptContext
import jwt

# --- CONFIGURATION ---
# In production, get these from os.environ!
SECRET_KEY = os.environ.get("SECRET_KEY", "super_secret_key_change_me")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- UTILITY FUNCTIONS ---


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(request: Request):
    """
    1. Grabs the cookie from the request.
    2. Decodes the JWT.
    3. Finds the user in MongoDB.
    """
    token = request.cookies.get("access_token")
    print(f"token: {token}")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email: str = payload.get("sub")
        if user_email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    # DB LOOKUP
    users = request.app.state.db.get_collection("users")
    print(users)
    user = await users.database["users"].find_one({"email": user_email})

    if user is None:
        raise HTTPException(status_code=401, detail="User not found")

    return user
