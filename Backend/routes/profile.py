from fastapi import APIRouter, Depends
from schemas import ProfileData
from database import profiles_collection
from routes.users import get_current_user
from models import profile_to_dict

router = APIRouter()

@router.post("/profile")
def save_profile(profile: ProfileData, current_user: str = Depends(get_current_user)):
    doc = profile_to_dict(current_user, profile.dict())
    profiles_collection.update_one(
        {"email": current_user}, {"$set": doc}, upsert=True
    )
    return {"message": "Profile saved successfully"}

@router.get("/profile")
def get_profile(current_user: str = Depends(get_current_user)):
    profile = profiles_collection.find_one({"email": current_user}, {"_id": 0})
    return profile or {"message": "No profile found"}