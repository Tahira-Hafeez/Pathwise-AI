from pydantic import BaseModel, EmailStr
from typing import List, Optional

class UserRegister(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class ProfileData(BaseModel):
    current_skills: List[str]
    background: str
    mode: str  # "new_path" | "career_switch" | "growth"
    target_role: str
    available_weekly_time: int
    preferred_learning_style: str