from fastapi import APIRouter
from bson import ObjectId
from models import users_serializer
from database import user_collection
from schemas import User

router = APIRouter()


# CREATE USER
@router.post("/add_user")
def add_user(user: User):
    result = user_collection.insert_one(dict(user))
    return {"message": "User added successfully"}


# GET USERS


@router.get("/users")
def get_users():
    users = user_collection.find()
    return users_serializer(users)


# DELETE USER
@router.delete("/delete_user/{id}")
def delete_user(id: str):
    user_collection.delete_one({"_id": ObjectId(id)})
    return {"message": "User deleted successfully"}


# UPDATE USER
@router.put("/update_user/{id}")
def update_user(id: str, user: User):

    user_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": {"username": user.username}}
    )

    return {"message": "User updated successfully"}