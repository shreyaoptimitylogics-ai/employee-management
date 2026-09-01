from fastapi import FastAPI

from app.routers.employee import router as employee_router

app = FastAPI(
    title="Employee Management API",
    version="1.0.0",
)

app.include_router(employee_router)


@app.get("/")
def root():
    return {
        "message": "Employee Management API is running"
    }