from fastapi import FastAPI
from app import models
from app.database import engine
from app.routes import auth, vacations
from fastapi.middleware.cors import CORSMiddleware


# Create the database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Vacation Management API")

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # should change to frntend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router, prefix="/api")
app.include_router(vacations.router, prefix="/api")
