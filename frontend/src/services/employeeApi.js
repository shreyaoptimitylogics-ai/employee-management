import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
});

// Get employees
export const getEmployees = (params = {}) => {
  return API.get("/employees/", { params });
};

// Get single employee
export const getEmployeeById = (id) => {
  return API.get(`/employees/${id}`);
};

// Create employee
export const createEmployee = (employeeData) => {
  return API.post("/employees/", employeeData);
};

// Update employee
export const updateEmployee = (id, employeeData) => {
  return API.put(`/employees/${id}`, employeeData);
};

// Delete employee
export const deleteEmployee = (id) => {
  return API.delete(`/employees/${id}`);
};

// Update employee status
export const updateEmployeeStatus = (id, status) => {
  return API.patch(`/employees/${id}/status`, {
    status,
  });
};