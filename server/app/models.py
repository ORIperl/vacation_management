from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, nullable=False)

    vacations = relationship("Vacation", back_populates="user")


class Vacation(Base):
    __tablename__ = "vacations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    start_date = Column(String, nullable=False)  # אפשר לשנות ל-Date אם רוצים
    end_date = Column(String, nullable=False)
    status = Column(String, default="pending")

    user = relationship("User", back_populates="vacations")
