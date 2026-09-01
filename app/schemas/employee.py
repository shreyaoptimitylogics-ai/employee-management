from datetime import date, datetime
from typing import Literal
from pydantic import BaseModel, EmailStr, Field, ConfigDict, field_validator


class EmployeeCreate(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: str | None = None
    age: int | None = None
    department: str = Field(..., min_length=1, max_length=100)
    designation: str = Field(..., min_length=1, max_length=100)
    salary: float = Field(..., gt=0)
    joining_date: date
    status: str = "Active"

    @field_validator("joining_date")
    @classmethod
    def validate_joining_date(cls, value: date):
        if value > date.today():
            raise ValueError("Joining date cannot be in the future")
        return value

class EmployeeUpdate(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: str | None = None
    age: int | None = None
    department: str = Field(..., min_length=1, max_length=100)
    designation: str = Field(..., min_length=1, max_length=100)
    salary: float = Field(..., gt=0)
    joining_date: date
    status: str = "Active"

    @field_validator("joining_date")
    @classmethod
    def validate_joining_date(cls, value: date):
        if value > date.today():
            raise ValueError("Joining date cannot be in the future")
        return value


class EmployeeStatusUpdate(BaseModel):
    status: Literal["Active", "Inactive"]


class EmployeeResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    first_name: str
    last_name: str
    email: str
    phone: str | None
    age: int | None
    department: str
    designation: str
    salary: float
    joining_date: date
    status: str
    created_at: datetime
    updated_at: datetime

