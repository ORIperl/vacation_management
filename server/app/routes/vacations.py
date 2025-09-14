from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

# Schema for vacation requests
class VacationRequest(BaseModel):
    id: int
    start_date: str
    end_date: str
    status: str

# Dummy data
dummy_requests = [
    {"id": 1, "start_date": "2025-10-01", "end_date": "2025-10-05", "status": "pending"},
    {"id": 2, "start_date": "2025-11-10", "end_date": "2025-11-12", "status": "approved"},
]

@router.get("/vacations", response_model=List[VacationRequest])
def get_vacations():
    """
    Returns a list of vacation requests (dummy data)
    """
    return dummy_requests

@router.post("/vacations")
def create_vacation(request: VacationRequest):
    """
    Accepts a vacation request and returns it (dummy implementation)
    """
    return {"message": "Vacation request received", "request": request}
