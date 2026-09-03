from datetime import date
from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate , EmployeeUpdate
from app.repositories import employee
from app.constants import messages


def create_employee(
    db: Session,
    employee_data: EmployeeCreate
) -> Employee:

    existing_employee = employee.get_employee_by_email(
        db,
        employee_data.email
    )

    if existing_employee:
       raise ValueError(messages.EMPLOYEE_EMAIL_EXISTS)

    new_employee = employee.create_employee(
        db,
        employee_data
    )

    return new_employee

# get

def get_employees(
    db: Session,
    skip: int = 0,
    limit: int = 10,
    search: str | None = None,
    department: str | None = None,
    status: str | None = None,
    designation: str | None = None,
    joining_date: date | None = None,
    sort_by: str = "id",
    sort_order: str = "asc",
) -> list[Employee]:

    return employee.get_employees(
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


    # get by id

def get_employee_by_id(
    db: Session,
    employee_id: int
) -> Employee:

    employee_data = employee.get_employee_by_id(
        db,
        employee_id
    )

    if not employee_data:
        raise ValueError(messages.EMPLOYEE_NOT_FOUND)

    return employee_data

    # update

def update_employee(
    db: Session,
    employee_id: int,
    employee_data: EmployeeUpdate
) -> Employee:

    existing_employee = employee.get_employee_by_id(
        db,
        employee_id
    )

    if not existing_employee:
        raise ValueError(messages.EMPLOYEE_NOT_FOUND)

    if employee_data.email != existing_employee.email:
        email_exists = employee.get_employee_by_email(
            db,
            employee_data.email
        )

        if email_exists:
            raise ValueError(messages.EMPLOYEE_EMAIL_EXISTS)

    return employee.update_employee(
        db,
        existing_employee,
        employee_data
    )

    # delete

def delete_employee(
    db: Session,
    employee_id: int
) -> Employee:

    existing_employee = employee.get_employee_by_id(
        db,
        employee_id
    )

    if not existing_employee:
        raise ValueError(messages.EMPLOYEE_NOT_FOUND)

    return employee.delete_employee(
        db,
        existing_employee
    )


def update_employee_status(
    db: Session,
    employee_id: int,
    status: str
) -> Employee:

    existing_employee = employee.get_employee_by_id(
        db,
        employee_id
    )

    if not existing_employee:
         raise ValueError(messages.EMPLOYEE_NOT_FOUND)

    return employee.update_employee_status(
        db,
        existing_employee,
        status
    )