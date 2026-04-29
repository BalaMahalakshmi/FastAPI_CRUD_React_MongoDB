from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI")

if not MONGO_URI:
    raise Exception("MongoDB URI not loaded. Check your .env file.")

client = MongoClient(MONGO_URI)

db = client.get_database("user_db")

user_collection = db["user_save_fetch"]
teacher_collection = db["teacher_collection"]
auth_collection = db["auth_users"]