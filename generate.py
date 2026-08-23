
import os
import json
from dotenv import load_dotenv
import google.generativeai as genai

from retrieve import find_skill_gap

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found. Add it to your .env file.")

genai.configure(api_key=GEMINI_API_KEY)
MODEL_NAME = "gemini-3.6-flash"  

def build_prompt(gap: dict) -> str:
    known = [s["skill"] for s in gap["known_skills"]]
    missing_details = [
        {
            "skill": s["skill"],
            "prerequisites": s["prerequisites"],
            "resource": s["resource"],
            "est_time": s["est_time"],
        }
        for s in gap["missing_skills"]
    ]

    return f"""You are a career advisor generating a personalized learning roadmap.

Target role: {gap['target_role']}
Skills the user already has: {known}
Skills the user is missing (with prerequisites, resources, and time estimates):
{json.dumps(missing_details, indent=2)}

Generate a clear, sequenced, step-by-step roadmap for the user to close
these skill gaps, in the correct prerequisite order. For each step include:
the skill name, why it matters, the recommended resource, and estimated time.
Keep it practical and encouraging. Return the roadmap as a numbered list."""


def generate_roadmap(current_skills: list[str], target_role: str) -> str:
    gap = find_skill_gap(current_skills, target_role)

    if not gap["missing_skills"]:
        return f"Great news — you already have all the core skills tracked for {target_role}!"

    prompt = build_prompt(gap)
    model = genai.GenerativeModel(MODEL_NAME)
    response = model.generate_content(prompt)
    return response.text


if __name__ == "__main__":
    sample_user_skills = ["Python Programming", "SQL"]
    sample_target_role = "AI Engineer"

    roadmap = generate_roadmap(sample_user_skills, sample_target_role)
    print(roadmap)
