from fastapi import APIRouter
from bson import ObjectId

from database import user_collection, teacher_collection
from schemas import User, Teacher
from models import users_serializer, teachers_serializer

router = APIRouter()


# ================= USER =================

@router.post("/add_user")
def add_user(user: User):
    user_collection.insert_one(dict(user))
    return {"message": "User added successfully"}


@router.get("/users")
def get_users():
    users = user_collection.find()
    return users_serializer(users)


@router.delete("/delete_user/{id}")
def delete_user(id: str):
    user_collection.delete_one({"_id": ObjectId(id)})
    return {"message": "User deleted successfully"}


@router.put("/update_user/{id}")
def update_user(id: str, user: User):

    user_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": dict(user)}
    )

    return {"message": "User updated successfully"}


# ================= TEACHER =================

@router.post("/add_teacher")
def add_teacher(teacher: Teacher):
    teacher_collection.insert_one(dict(teacher))
    return {"message": "Teacher added successfully"}


@router.get("/teachers")
def get_teachers():
    teachers = teacher_collection.find()
    return teachers_serializer(teachers)


@router.delete("/delete_teacher/{id}")
def delete_teacher(id: str):
    teacher_collection.delete_one({"_id": ObjectId(id)})
    return {"message": "Teacher deleted successfully"}


@router.put("/update_teacher/{id}")
def update_teacher(id: str, teacher: Teacher):

    teacher_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": dict(teacher)}
    )

    return {"message": "Teacher updated successfully"}