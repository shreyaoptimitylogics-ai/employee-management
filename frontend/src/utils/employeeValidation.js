export const validateEmployeeForm = (formData) => {
  const errors = {};

  // First Name
  if (!formData.first_name.trim()) {
    errors.first_name = "First name is required";
  } else if (formData.first_name.trim().length < 2) {
    errors.first_name = "First name must be at least 2 characters";
  } else if (formData.first_name.trim().length > 100) {
    errors.first_name = "First name cannot exceed 100 characters";
  }

  // Last Name
  if (!formData.last_name.trim()) {
    errors.last_name = "Last name is required";
  } else if (formData.last_name.trim().length < 2) {
    errors.last_name = "Last name must be at least 2 characters";
  } else if (formData.last_name.trim().length > 100) {
    errors.last_name = "Last name cannot exceed 100 characters";
  }

  // Email
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Please enter a valid email";
  }

  // Phone
  if (formData.phone && !/^\d{10,15}$/.test(formData.phone)) {
    errors.phone = "Phone must be between 10 and 15 digits";
  }

  // Age
  if (formData.age) {
    const age = Number(formData.age);

    if (age < 18 || age > 100) {
      errors.age = "Age must be between 18 and 100";
    }
  }

  // Department
  if (!formData.department.trim()) {
    errors.department = "Department is required";
  } else if (formData.department.trim().length < 2) {
    errors.department = "Department must be at least 2 characters";
  } else if (formData.department.trim().length > 100) {
    errors.department = "Department cannot exceed 100 characters";
  }

  // Designation
  if (!formData.designation.trim()) {
    errors.designation = "Designation is required";
  } else if (formData.designation.trim().length < 2) {
    errors.designation = "Designation must be at least 2 characters";
  } else if (formData.designation.trim().length > 100) {
    errors.designation = "Designation cannot exceed 100 characters";
  }

  // Salary
  if (!formData.salary) {
    errors.salary = "Salary is required";
  } else if (Number(formData.salary) <= 0) {
    errors.salary = "Salary must be greater than 0";
  }

  // Joining Date
  if (!formData.joining_date) {
    errors.joining_date = "Joining date is required";
  } else {
    const today = new Date().toISOString().split("T")[0];

    if (formData.joining_date > today) {
      errors.joining_date = "Joining date cannot be in the future";
    }
  }

  // Status
  if (!["Active", "Inactive"].includes(formData.status)) {
    errors.status = "Invalid status";
  }

  return errors;
};