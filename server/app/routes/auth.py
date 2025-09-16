from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app import models
from app.database import SessionLocal
import bcrypt

router = APIRouter()

# Schemas
class SignupData(BaseModel):
    email: str
    password: str
    role: str

class LoginData(BaseModel):
    email: str
    password: str

# Dependency to db session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Signup
@router.post("/signup")
def signup(data: SignupData, db: Session = Depends(get_db)):
    # check if user exists
    if db.query(models.User).filter(models.User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    # hash password
    hashed = bcrypt.hashpw(data.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    new_user = models.User(email=data.email, password_hash=hashed, role=data.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created", "id": new_user.id, "role": new_user.role}

# Login
@router.post("/login")
def login(data: LoginData, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=400, detail="User not found")

    if not bcrypt.checkpw(data.password.encode("utf-8"), user.password_hash.encode("utf-8")):
        raise HTTPException(status_code=400, detail="Incorrect password")

    return {"message": "Login success", "role": user.role, "user_id": user.id}
