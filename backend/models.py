from pydantic import BaseModel, Field, BeforeValidator, EmailStr
from typing import Optional
from datetime import datetime
from typing_extensions import Annotated
from bson import ObjectId

PyObjectId = Annotated[str, BeforeValidator(str)]


class Rating(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    user_id: PyObjectId
    joke_id: str
    rating: int = Field(ge=1, le=5, description="Rating between 1 and 5")
    comment: Optional[str] = Field(default=None, max_length=1000)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}


# 1. The Summary Model
class JokeRatingSummary(BaseModel):
    average_rating: float = Field(default=0.0)
    total_ratings: int = Field(default=0)
    # Breakdown allows you to show a histogram (e.g., 10 people voted 5 stars)
    five_star_count: int = 0
    four_star_count: int = 0
    three_star_count: int = 0
    two_star_count: int = 0
    one_star_count: int = 0


# 2. Your Main Joke Model
class Joke(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    joke: str

    # EMBED THE SUMMARY HERE
    rating_summary: JokeRatingSummary = Field(default_factory=JokeRatingSummary)


class User(BaseModel):
    # Maps MongoDB _id to Python id
    id: Optional[PyObjectId] = Field(alias="_id", default=None)

    name: str

    # EmailStr validates format (requires 'pip install pydantic[email]')
    # If you don't want to install that, just use 'str'
    email: EmailStr

    # STORE THE HASH HERE (e.g. bcrypt hash), NOT PLAIN TEXT
    password: str

    class Config:
        populate_by_name = True


class UserLogin(BaseModel):
    email: EmailStr
    password: str


# Use your existing User model for DB interaction,
# but we usually create a UserOut model to exclude the password from responses.
class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr


async def update_joke_summary(joke_id: str, db):
    """
    Aggregates all ratings for a specific joke_id and updates the
    Joke document with the new summary.
    """

    # The pipeline logic
    pipeline = [
        # 1. Match only ratings for this specific joke
        {"$match": {"joke_id": joke_id}},
        # 2. Group them together
        {
            "$group": {
                "_id": "$joke_id",
                # Calculate Average of the 'rating' field
                "average_rating": {"$avg": "$rating"},
                # Count total documents
                "total_ratings": {"$sum": 1},
                # Calculate the buckets for 1-5 stars
                "five_star": {"$sum": {"$cond": [{"$eq": ["$rating", 5]}, 1, 0]}},
                "four_star": {"$sum": {"$cond": [{"$eq": ["$rating", 4]}, 1, 0]}},
                "three_star": {"$sum": {"$cond": [{"$eq": ["$rating", 3]}, 1, 0]}},
                "two_star": {"$sum": {"$cond": [{"$eq": ["$rating", 2]}, 1, 0]}},
                "one_star": {"$sum": {"$cond": [{"$eq": ["$rating", 1]}, 1, 0]}},
            }
        },
    ]

    # Run the pipeline on the 'ratings' collection
    ratings = db.get_collection("ratings")
    cursor = await ratings.aggregate(pipeline)
    result = await cursor.to_list(length=1)

    # Prepare the update data
    if result:
        data = result[0]
        summary_data = {
            "average_rating": round(
                data["average_rating"], 1
            ),  # Round to 1 decimal place
            "total_ratings": data["total_ratings"],
            "five_star_count": data["five_star"],
            "four_star_count": data["four_star"],
            "three_star_count": data["three_star"],
            "two_star_count": data["two_star"],
            "one_star_count": data["one_star"],
        }
    else:
        # Reset if all ratings were deleted
        summary_data = {
            "average_rating": 0.0,
            "total_ratings": 0,
            "five_star_count": 0,
            "four_star_count": 0,
            "three_star_count": 0,
            "two_star_count": 0,
            "one_star_count": 0,
        }

    # Update the JOKE document (not the rating document)
    jokes = db.get_collection("jokes")
    await jokes.update_one({"_id": joke_id}, {"$set": {"rating_summary": summary_data}})
