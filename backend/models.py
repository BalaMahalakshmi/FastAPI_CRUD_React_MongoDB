from bson import ObjectId


def user_serializer(user):
    return {
        "id": str(user["_id"]),
        "first_name": user["first_name"],
        "last_name": user["last_name"],
        "register_number": user["register_number"],
        "mobile": user["mobile"],
        "email": user["email"],
    }


def users_serializer(users):
    return [user_serializer(user) for user in users]


def teacher_serializer(teacher):
    return {
        "id": str(teacher["_id"]),
        "first_name": teacher["first_name"],
        "last_name": teacher["last_name"],
        "staff_id": teacher["staff_id"],
        "mobile": teacher["mobile"],
        "email": teacher["email"],
        "subject": teacher["subject"],
    }


def teachers_serializer(teachers):
    return [teacher_serializer(t) for t in teachers]