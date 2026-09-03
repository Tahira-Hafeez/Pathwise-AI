def profile_to_dict(email: str, profile_data: dict):
    return {
        "email": email,
        "current_skills": profile_data["current_skills"],
        "background": profile_data["background"],
        "mode": profile_data["mode"],
        "target_role": profile_data["target_role"],
        "available_weekly_time": profile_data["available_weekly_time"],
        "preferred_learning_style": profile_data["preferred_learning_style"],
    }