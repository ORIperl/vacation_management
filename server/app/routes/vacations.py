from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from app import models
from app.database import SessionLocal
from datetime import datetime
from fastapi import Query


router = APIRouter()

# ----------------------
# Schemas
# ----------------------
class VacationRequest(BaseModel):
    start_date: str
    end_date: str

class VacationResponse(BaseModel):
    id: int
    user_id: int
    start_date: str
    end_date: str
    status: str

    class Config:
        orm_mode = True

class VacationCalendarResponse(BaseModel):
    user_id: int
    user_name: str
    start_date: str
    end_date: str

    class Config:
        orm_mode = True

# ----------------------
# Dependency
# ----------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ----------------------
# User API - employee
# ----------------------
@router.post("/vacations", response_model=VacationResponse)
def create_vacation(request: VacationRequest, user_id: int, db: Session = Depends(get_db)):
    # Check date format
    try:
        start_date = datetime.strptime(request.start_date, "%Y-%m-%d").date()
        end_date = datetime.strptime(request.end_date, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Dates must be in YYYY-MM-DD format")

    new_vac = models.Vacation(
        user_id=user_id,
        start_date=request.start_date,
        end_date=request.end_date,
        status="pending"  # each new request starts as pending
    )
    db.add(new_vac)
    db.commit()
    db.refresh(new_vac)
    return new_vac

@router.get("/vacations", response_model=List[VacationResponse])
def get_vacations(user_id: int, db: Session = Depends(get_db)):
    vacations = db.query(models.Vacation).filter(models.Vacation.user_id == user_id).all()
    return vacations

# ----------------------
# Manager API - manager
# ----------------------
# The manager can view all pending vacation requests
@router.get("/manager/pending_vacations", response_model=List[VacationResponse])
def get_pending_vacations(db: Session = Depends(get_db)):
    vacations = db.query(models.Vacation).filter(models.Vacation.status == "pending").all()
    return vacations

# The manager can approve or deny a vacation request by its ID
@router.put("/manager/vacations/{vacation_id}/status")
def update_vacation_status(vacation_id: int, status: str, db: Session = Depends(get_db)):
    """
    status: "approved" or "denied"
    """
    vacation = db.query(models.Vacation).filter(models.Vacation.id == vacation_id).first()
    if not vacation:
        raise HTTPException(status_code=404, detail="Vacation request not found")
    
    if vacation.status != "pending":
        raise HTTPException(status_code=400, detail="Vacation already processed")
    
    vacation.status = status
    db.commit()
    db.refresh(vacation)
    return {"message": f"Vacation {status} successfully", "vacation": vacation}

# The manager can view a calendar of all approved vacations

@router.get("/manager/calendar", response_model=List[VacationCalendarResponse])
def get_vacation_calendar(
    start_date: str = Query(..., description="Start of date range YYYY-MM-DD"),
    end_date: str = Query(..., description="End of date range YYYY-MM-DD"),
    db: Session = Depends(get_db)
):
    vacations = db.query(models.Vacation)\
        .filter(
            models.Vacation.status == "approved",
            models.Vacation.start_date <= end_date,
            models.Vacation.end_date >= start_date
        ).all()

    calendar = [
        VacationCalendarResponse(
            user_id=vac.user_id,
            #get the user name from user table
            user_name=db.query(models.User).filter(models.User.id == vac.user_id).first().email,
            start_date=vac.start_date,
            end_date=vac.end_date
        )
        for vac in vacations
    ]

    return calendar