from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="PathWise AI Backend")

app.add_middleware(
    CORSMiddleware,
   allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://192.168.100.18:3000",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

from routes import users, profile, roadmap, compare

app.include_router(users.router, tags=["Users"])
app.include_router(profile.router, tags=["Profile"])
app.include_router(roadmap.router, tags=["Roadmap"])
app.include_router(compare.router, tags=["Comparison"])

@app.get("/")
def root():
    return {"message": "PathWise AI backend running"}
