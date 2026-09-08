import React, { useEffect, useState } from "react";
import {
  createEmployee,
  updateEmployee,
} from "../services/employeeApi";
import { validateEmployeeForm } from "../utils/employeeValidation";

const EmployeeForm = ({ employee, onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    age: "",
    department: "",
    designation: "",
    salary: "",
    joining_date: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        first_name: employee.first_name || "",
        last_name: employee.last_name || "",
        email: employee.email || "",
        phone: employee.phone || "",
        age: employee.age || "",
        department: employee.department || "",
        designation: employee.designation || "",
        salary: employee.salary || "",
        joining_date: employee.joining_date || "",
        status: employee.status || "Active",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Remove error for the field user is editing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateEmployeeForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const data = {
        ...formData,
        age: formData.age ? Number(formData.age) : null,
        salary: Number(formData.salary),
      };

      if (employee) {
        await updateEmployee(employee.id, data);
        console.log("Employee updated");
      } else {
        await createEmployee(data);
        console.log("Employee created");
      }

      setErrors({});
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save employee:", error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-3.5 py-2.5 rounded-lg border border-gray-400 text-sm text-black placeholder:text-black bg-white";

  const errorClass = "mt-1 text-sm text-red-500";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#14231C]/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-blue-50">
          <h2 className="text-lg font-semibold text-[#14231C]">
            {employee ? "Edit Employee" : "Add Employee"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-300 hover:text-[#14231C] hover:bg-blue-50 transition-colors duration-200"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

          {/* First Name + Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                className={inputClass}
              />

              {errors.first_name && (
                <p className={errorClass}>{errors.first_name}</p>
              )}
            </div>

            <div>
              <input
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                className={inputClass}
              />

              {errors.last_name && (
                <p className={errorClass}>{errors.last_name}</p>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            {errors.status && (
              <p className={errorClass}>{errors.status}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />

            {errors.email && (
              <p className={errorClass}>{errors.email}</p>
            )}
          </div>

          {/* Phone + Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
              />

              {errors.phone && (
                <p className={errorClass}>{errors.phone}</p>
              )}
            </div>

            <div>
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className={inputClass}
              />

              {errors.age && (
                <p className={errorClass}>{errors.age}</p>
              )}
            </div>
          </div>

          {/* Department + Designation */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                className={inputClass}
              />

              {errors.department && (
                <p className={errorClass}>{errors.department}</p>
              )}
            </div>

            <div>
              <input
                name="designation"
                placeholder="Designation"
                value={formData.designation}
                onChange={handleChange}
                className={inputClass}
              />

              {errors.designation && (
                <p className={errorClass}>{errors.designation}</p>
              )}
            </div>
          </div>

          {/* Salary + Joining Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                name="salary"
                placeholder="Salary"
                value={formData.salary}
                onChange={handleChange}
                className={inputClass}
              />

              {errors.salary && (
                <p className={errorClass}>{errors.salary}</p>
              )}
            </div>

            <div>
              <input
                type="date"
                name="joining_date"
                value={formData.joining_date}
                onChange={handleChange}
                className={inputClass}
              />

              {errors.joining_date && (
                <p className={errorClass}>{errors.joining_date}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
            >
              {loading
                ? "Saving..."
                : employee
                  ? "Update Employee"
                  : "Save Employee"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;