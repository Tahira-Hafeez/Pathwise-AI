from fastapi import APIRouter
from pydantic import BaseModel

from generate import generate_roadmap


router = APIRouter(
    tags=["Roadmap"]
)


class RoadmapRequest(BaseModel):
    current_skills: list[str]
    target_role: str


@router.post("/generate-roadmap")
def create_roadmap(request: RoadmapRequest):

    roadmap = generate_roadmap(
        request.current_skills,
        request.target_role
    )

    return {
        "target_role": request.target_role,
        "roadmap": roadmap
    }