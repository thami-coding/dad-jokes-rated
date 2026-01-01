from datetime import timedelta
import os
from fastapi import FastAPI, Response, HTTPException, status, Depends
from bson import ObjectId
from pymongo import AsyncMongoClient
from auth import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    create_access_token,
    get_current_user,
    verify_password,
)
from models import Joke, Rating, User, UserLogin, UserOut, update_joke_summary
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Dad jokes Rating API",
    summary="A application that rates dad jokes",
)
client = AsyncMongoClient(os.environ["MONGODB_URL"])
db = client.user_reviews
app.state.db = db
ratings = db.get_collection("ratings")
users = db.get_collection("users")
jokes = db.get_collection("jokes")

# Define the exact URLs of your frontend
origins = [
    "http://localhost:3000",  # React / Next.js default
    "http://127.0.0.1:3000",  # Alternative localhost
    "http://localhost:5173",  # Vite default
    # "https://your-production-app.com" # Add this later for deploy
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # <--- CANNOT be ["*"]
    allow_credentials=True,  # <--- Required for your HTTP-Only Cookie
    allow_methods=["*"],
    allow_headers=["*"],
)
# Setup hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@app.post("/jokes/{joke_id}/rate")
async def rate_joke(joke_id: str, rating: Rating):
    # 1. Convert incoming joke_id string to ObjectId for storage
    rating_dict = rating.model_dump(by_alias=True, exclude={"id"})
    rating_dict["user_id"] = ObjectId(rating.user_id)

    # 2. Save the Rating
    await ratings.insert_one(rating_dict)

    # 3. Trigger the Summary Update
    # This recalculates the average and updates the Joke document
    await update_joke_summary(joke_id, db)

    return {"message": "Rating submitted and joke summary updated"}


@app.post("/jokes")
async def add_joke(joke: Joke):
    save_joke = joke.model_dump(by_alias=True, exclude={"id"})
    await jokes.insert_one(save_joke)
    return {"message": "Joke Saved!!"}


@app.post("/register")
async def register_user(user_data: User):
    # 1. Hash the password
    hashed_pw = pwd_context.hash(user_data.password)

    # 2. Create document (replacing plain text with hash)
    user_doc = user_data.model_dump(by_alias=True, exclude={"id"})
    user_doc["password"] = hashed_pw

    # 3. Save to DB
    await users.insert_one(user_doc)
    return {"msg": "User created"}


@app.post("/login")
async def login(user_in: UserLogin, response: Response):
    # 1. Check if user exists
    user = await users.find_one({"email": user_in.email})
    if not user or not verify_password(user_in.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    # 2. Create JWT Token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )

    # 3. Set HTTP-Only Cookie
    # This prevents JavaScript (XSS) from reading the token.
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,  # CRITICAL: JS cannot read this
        secure=False,  # Set to True if using HTTPS (Production)
        samesite="lax",  # Protects against CSRF
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )

    return {"message": "Login successful"}


@app.post("/logout")
async def logout(response: Response):
    # To logout, we simply delete the cookie
    response.delete_cookie("access_token")
    return {"message": "Logged out successfully"}


# --- PROTECTED ROUTE EXAMPLE ---


@app.get("/users/me", response_model=UserOut)
async def read_users_me(current_user: dict = Depends(get_current_user)):
    # Convert ObjectId to string for the response model
    return {
        "id": str(current_user["_id"]),
        "name": current_user["name"],
        "email": current_user["email"],
    }
