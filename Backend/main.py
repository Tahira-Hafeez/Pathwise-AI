from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import users, profile, roadmap

app = FastAPI(title="PathWise AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten this later to just your frontend URL
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, tags=["Users"])
app.include_router(profile.router, tags=["Profile"])
app.include_router(roadmap.router, tags=["Roadmap"])

@app.get("/")
def root():
    return {"message": "PathWise AI backend running"}