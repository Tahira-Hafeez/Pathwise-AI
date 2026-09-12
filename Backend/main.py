from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import users, profile, roadmap, compare

app = FastAPI(title="PathWise AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, tags=["Users"])
app.include_router(profile.router, tags=["Profile"])
app.include_router(roadmap.router, tags=["Roadmap"])
app.include_router(compare.router, tags=["Comparison"])

@app.get("/")
def root():
    return {"message": "PathWise AI backend running"}
