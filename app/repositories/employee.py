from datetime import datetime
from sqlalchemy.orm import Session
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate , EmployeeUpdate


def create_employee(db: Session, employee_data: EmployeeCreate) -> Employee:
    new_employee = Employee(**employee_data.model_dump())
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee


def get_employee_by_email(db: Session, email: str) -> Employee | None:
    return db.query(Employee).filter(Employee.email == email).first()


    # get employee


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

    query = db.query(Employee).filter(
        Employee.deleted_at.is_(None)
    )

    # Search
    if search:
        search_value = f"%{search}%"
        query = query.filter(
            (Employee.first_name.ilike(search_value)) |
            (Employee.last_name.ilike(search_value)) |
            (Employee.email.ilike(search_value))
        )

    # Filters
    if department:
        query = query.filter(Employee.department == department)

    if status:
        query = query.filter(Employee.status == status)

    if designation:
        query = query.filter(Employee.designation == designation)

    if joining_date:
        query = query.filter(Employee.joining_date == joining_date)

    # Sorting
    
    allowed_sort_fields = {
        "id": Employee.id,
        "first_name": Employee.first_name,
        "last_name": Employee.last_name,
        "salary": Employee.salary,
        "joining_date": Employee.joining_date,
        "created_at": Employee.created_at,
        "updated_at": Employee.updated_at,
    }

    sort_column = allowed_sort_fields.get(sort_by, Employee.id)

    if sort_order == "desc":
        query = query.order_by(sort_column.desc())
    else:
        query = query.order_by(sort_column.asc())

    return query.offset(skip).limit(limit).all()

    


    # get by id

def get_employee_by_id(
    db: Session,
    employee_id: int
) -> Employee | None:

    return (
        db.query(Employee)
        .filter(
            Employee.id == employee_id,
            Employee.deleted_at.is_(None)
        )
        .first()
    )

    # update

def update_employee(
    db: Session,
    employee: Employee,
    employee_data: EmployeeUpdate
) -> Employee:

    for field, value in employee_data.model_dump().items():
        setattr(employee, field, value)

    db.commit()
    db.refresh(employee)

    return employee

    # delete

def delete_employee(
    db: Session,
    employee: Employee
) -> Employee:

    employee.deleted_at = datetime.utcnow()

    db.commit()
    db.refresh(employee)

    return employee


def update_employee_status(
    db: Session,
    employee: Employee,
    status: str
) -> Employee:

    employee.status = status

    db.commit()
    db.refresh(employee)

    return employee