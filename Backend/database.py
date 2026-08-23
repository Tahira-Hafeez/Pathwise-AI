from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise RuntimeError("MONGO_URI is missing — check your .env file")

client = MongoClient(MONGO_URI)
db = client["pathwiseAI"]

users_collection = db["users"]
profiles_collection = db["profile"]
roadmaps_collection = db["roadmaps"]

# Fail loudly at startup if Mongo isn't actually reachable
try:
    client.admin.command("ping")
    print("MongoDB connected successfully")
except Exception as e:
    print("MongoDB connection FAILED:", e)