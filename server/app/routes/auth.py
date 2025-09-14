from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# Schema for login
class LoginData(BaseModel):
    email: str
    password: str
    userType: str

@router.post("/login")
def login(data: LoginData):
    """
    Minimal login endpoint.
    Returns user role based on input (no DB yet).
    """
    if data.userType.lower() == "worker":
        return {"message": "Login success", "role": "worker"}
    elif data.userType.lower() == "manager":
        return {"message": "Login success", "role": "manager"}
    else:
        return {"message": "Invalid userType"}
