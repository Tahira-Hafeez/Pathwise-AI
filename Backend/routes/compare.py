from fastapi import APIRouter
from pydantic import BaseModel

from retrieve import find_skill_gap

router = APIRouter(tags=["Comparison"])

AVAILABLE_ROLES = ["AI Engineer", "Data Analyst", "UX Designer", "Product Manager"]


class CompareRequest(BaseModel):
    current_skills: list[str]
    target_roles: list[str] = AVAILABLE_ROLES


@router.post("/compare-roles")
def compare_roles(request: CompareRequest):
    comparisons = []

    for role in request.target_roles:
        gap = find_skill_gap(request.current_skills, role)
        known_count = len(gap["known_skills"])
        missing_count = len(gap["missing_skills"])
        total = known_count + missing_count
        readiness_pct = round((known_count / total) * 100, 1) if total else 0

        comparisons.append({
            "target_role": role,
            "known_count": known_count,
            "missing_count": missing_count,
            "readiness_pct": readiness_pct,
            "missing_skills": [s["skill"] for s in gap["missing_skills"]],
        })

    comparisons.sort(key=lambda c: c["readiness_pct"], reverse=True)

    return {
        "comparisons": comparisons,
        "recommended_role": comparisons[0]["target_role"] if comparisons else None,
    }
