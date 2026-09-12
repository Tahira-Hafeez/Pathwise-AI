from fastapi import APIRouter
from pydantic import BaseModel

from generate import generate_roadmap


router = APIRouter(
    tags=["Roadmap"]
)


class RoadmapRequest(BaseModel):
    current_skills: list[str]
    target_role: str
    mode: str = "new_path"


@router.post("/generate-roadmap")
def create_roadmap(request: RoadmapRequest):

    roadmap = generate_roadmap(
        request.current_skills,
        request.target_role,
        request.mode
    )

    return {
        "target_role": request.target_role,
        "mode": request.mode,
        "roadmap": roadmap
    }
