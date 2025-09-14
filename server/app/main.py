from fastapi import FastAPI
from app.routes import auth, vacations

app = FastAPI(title="Vacation Management API")

# Register routers
app.include_router(auth.router, prefix="/api")
app.include_router(vacations.router, prefix="/api")
