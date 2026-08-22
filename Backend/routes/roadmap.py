from fastapi import APIRouter, Depends
from database import profiles_collection, roadmaps_collection
from routes.users import get_current_user

router = APIRouter()

def generate_roadmap_stub(profile: dict):
    # TEMPORARY placeholder until Ateeka's real RAG pipeline is ready
    return {
        "roadmap": [
            {"skill": "Example Skill 1", "resource": "Example Course", "time_estimate": "2 weeks"},
            {"skill": "Example Skill 2", "resource": "Example Course", "time_estimate": "3 weeks"},
        ]
    }

@router.post("/generate-roadmap")
def generate_roadmap(current_user: str = Depends(get_current_user)):
    profile = profiles_collection.find_one({"email": current_user}, {"_id": 0})
    if not profile:
        return {"message": "Please complete your profile first"}

    result = generate_roadmap_stub(profile)  # swap this for Ateeka's real function later

    roadmaps_collection.update_one(
        {"email": current_user}, {"$set": {"roadmap": result["roadmap"]}}, upsert=True
    )
    return result