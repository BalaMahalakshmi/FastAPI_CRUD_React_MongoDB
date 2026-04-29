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
def get_users(search: str = ""):

    if search:
        users = user_collection.find({
            "first_name": {"$regex": search, "$options": "i"}
        })
    else:
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

@router.get("/stats")
def stats():
    return {
        "students": user_collection.count_documents({}),
        "teachers": teacher_collection.count_documents({})

}














# from fastapi import APIRouter
# from bson import ObjectId

# from database import user_collection, teacher_collection
# from schemas import User, Teacher
# from models import users_serializer, teachers_serializer

# router = APIRouter()


# # ================= USER =================

# @router.post("/add_accounts")
# def add_accounts(user: User):
#     user_collection.insert_one(dict(user))
#     return {"message": "User added successfully"}


# @router.get("/account_users")
# def ac_users(search: str = ""):

#     if search:
#         users = user_collection.find({
#             "first_name": {"$regex": search, "$options": "i"}
#         })
#     else:
#         users = user_collection.find()

#     return users_serializer(users)


# @router.delete("/delete_useraccount/{id}")
# def delete_useraccount(id: str):
#     user_collection.delete_one({"_id": ObjectId(id)})
#     return {"message": "User deleted successfully"}


# # @router.put("/update_user/{id}")
# # def update_user(id: str, user: User):

# #     user_collection.update_one(
# #         {"_id": ObjectId(id)},
# #         {"$set": dict(user)}
# #     )

# #     return {"message": "User updated successfully"}


# # ================= TEACHER =================

# @router.post("/add_images")
# def add_images(teacher: Teacher):
#     teacher_collection.insert_one(dict(teacher))
#     return {"message": "Teacher added successfully"}

# @router.post("/add_videos")
# def add_videos(teacher: Teacher):
#     teacher_collection.insert_one(dict(teacher))
#     return {"message": "Teacher added successfully"}


# @router.get("/images")
# def get_images():
#     teachers = teacher_collection.find()
#     return teachers_serializer(teachers)


# @router.delete("/delete_images/{id}")
# def delete_images(id: str):
#     teacher_collection.delete_one({"_id": ObjectId(id)})
#     return {"message": "Teacher deleted successfully"}


# # @router.put("/update_teacher/{id}")
# # def update_teacher(id: str, teacher: Teacher):

# #     teacher_collection.update_one(
# #         {"_id": ObjectId(id)},
# #         {"$set": dict(teacher)}
# #     )

# #     return {"message": "Teacher updated successfully"}

# @router.delete("/delete_video/{id}")
# def delete_video(id: str):
#     teacher_collection.delete_one({"_id": ObjectId(id)})
#     return {"message": "Teacher deleted successfully"}



# @router.get("/stats")
# def stats():
#     return {
#         "students": user_collection.count_documents({}),
#         "teachers": teacher_collection.count_documents({})

# }