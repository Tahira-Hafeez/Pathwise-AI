from fastapi import APIRouter, HTTPException, Depends
from schemas import UserRegister, UserLogin
from database import users_collection
from auth import hash_password, verify_password, create_access_token, decode_token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()
router = APIRouter()

@router.post("/register")
def register(user: UserRegister):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_pw = hash_password(user.password)
    users_collection.insert_one({"email": user.email, "password": hashed_pw})
    return {"message": "User registered successfully"}

@router.post("/login")
def login(user: UserLogin):
    db_user = users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = decode_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload["sub"]

@router.get("/me")
def read_current_user(current_user: str = Depends(get_current_user)):
    return {"email": current_user}