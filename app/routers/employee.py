from datetime import date
from fastapi import APIRouter, Depends, HTTPException, status , Query
from sqlalchemy.orm import Session
from app.constants import messages
from app.core.database import get_db
from app.schemas.employee import (
    EmployeeCreate,
    EmployeeUpdate,
    EmployeeStatusUpdate,
    EmployeeResponse,
    EmployeeCreateResponse,
    EmployeeUpdateResponse,
)
from app.services import employee_service


router = APIRouter(
    prefix="/api/v1/employees",
    tags=["Employees"]
)


@router.post(
    "/",
    response_model=EmployeeCreateResponse,
    status_code=status.HTTP_201_CREATED
)
def create_employee(
    employee_data: EmployeeCreate,
    db: Session = Depends(get_db)
):
    try:
        created_employee = employee_service.create_employee(
            db,
            employee_data
        )

        return {
            "message": messages.EMPLOYEE_CREATED,
            "data": created_employee
        }

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(e)
        )




@router.get(
    "/",
    response_model=list[EmployeeResponse],
    status_code=status.HTTP_200_OK
)
def get_employees(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    search: str | None = Query(None),
     department: str | None = Query(None),
    status: str | None = Query(None),
    designation: str | None = Query(None),
    joining_date: date | None = Query(None),
    sort_by: str = Query("id"),
    sort_order: str = Query("asc"),
    db: Session = Depends(get_db)
):
    return employee_service.get_employees(
    db,
    skip,
    limit,
    search,
    department,
    status,
    designation,
    joining_date,
    sort_by,
    sort_order
)



@router.get(
    "/{id}",
    response_model=EmployeeResponse,
    status_code=status.HTTP_200_OK
)
def get_employee(
    id: int,
    db: Session = Depends(get_db)
):
    try:
        return employee_service.get_employee_by_id(
            db,
            id
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )



@router.put(
    "/{id}",
    response_model=EmployeeUpdateResponse,
    status_code=status.HTTP_200_OK
)
def update_employee(
    id: int,
    employee_data: EmployeeUpdate,
    db: Session = Depends(get_db)
):
    try:
        updated_employee = employee_service.update_employee(
            db,
            id,
            employee_data
        )

        return {
            "message": messages.EMPLOYEE_UPDATED,
            "data": updated_employee
        }

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(e)
        )
        # delete

@router.delete(
    "/{id}",
    status_code=status.HTTP_200_OK
)
def delete_employee(
    id: int,
    db: Session = Depends(get_db)
):
    try:
        employee_service.delete_employee(
            db,
            id
        )

        return {
            "message": messages.EMPLOYEE_DELETED
        }

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )        


@router.patch(
    "/{id}/status",
    response_model=EmployeeResponse,
    status_code=status.HTTP_200_OK
)
def update_employee_status(
    id: int,
    status_data: EmployeeStatusUpdate,
    db: Session = Depends(get_db)
):
    try:
        return employee_service.update_employee_status(
            db,
            id,
            status_data.status
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )        