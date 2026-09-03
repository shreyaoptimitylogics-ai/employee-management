import React, { useState } from "react";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import Pagination from "../components/Pagination";

function Employees() {
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [status, setStatus] = useState("");
  const [designation, setDesignation] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const handleSuccess = () => {
    setRefresh((prev) => prev + 1);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  const selectClass =
    "px-3 py-2 rounded-lg border border-[#DCE9EA] text-[13px] text-[#14231C] bg-white focus:outline-none focus:ring-2 focus:ring-[#2E9DA9]/25 focus:border-[#2E9DA9] transition-colors duration-200";

  const activeFilterCount = [department, status, designation, joiningDate].filter(
    Boolean
  ).length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      
      <h1 className="text-[21px] font-semibold text-[#14231C] mb-4">
        Employee Management
      </h1>

      
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9FB3B5]"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#DCE9EA] text-[13.5px] text-[#14231C] placeholder:text-[#9FB3B5] focus:outline-none focus:ring-2 focus:ring-[#2E9DA9]/25 focus:border-[#2E9DA9] transition-colors duration-200"
          />
        </div>

       
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`relative inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-[13.5px] font-medium border transition-all duration-200 shrink-0 ${
            showFilters
              ? "border-[#2E9DA9] bg-[#2E9DA9] text-white shadow-sm shadow-[#2E9DA9]/25"
              : "border-[#DCE9EA] text-[#14231C] hover:bg-[#EFF8F8] hover:border-[#BFE0E2]"
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${showFilters ? "rotate-180" : ""}`}
          >
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3Z" />
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span
              className={`flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-semibold transition-colors duration-200 ${
                showFilters ? "bg-white text-[#2E9DA9]" : "bg-[#2E9DA9] text-white"
              }`}
            >
              {activeFilterCount}
            </span>
          )}
        </button>

        
        <button
          onClick={() => {
            setEditingEmployee(null);
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13.5px] font-medium bg-[#2E9DA9] text-white hover:bg-[#25818C] active:scale-[0.98] transition-all duration-200 shrink-0 ml-auto shadow-sm shadow-[#2E9DA9]/25"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          Add Employee
        </button>
      </div>

     
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          showFilters ? "grid-rows-[1fr] opacity-100 mb-5" : "grid-rows-[0fr] opacity-0 mb-0"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`relative overflow-hidden rounded-xl border border-[#CFE9EB] bg-white transform transition-all duration-300 ${
              showFilters ? "translate-y-0" : "-translate-y-3"
            }`}
          >
           
            <div className="h-[3px] w-full bg-gradient-to-r from-[#2E9DA9] to-[#7FCBD2]" />

            <div className="flex flex-wrap items-center gap-3 p-4 bg-[#F4FBFB]">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-[#5C7A7D] pl-0.5">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className={selectClass}
                >
                  <option value="">All Departments</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-[#5C7A7D] pl-0.5">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={selectClass}
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-[#5C7A7D] pl-0.5">
                  Designation
                </label>
                <select
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className={selectClass}
                >
                  <option value="">All Designations</option>
                  <option value="Developer">Developer</option>
                  <option value="Manager">Manager</option>
                  <option value="Designer">Designer</option>
                  <option value="HR Executive">HR Executive</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-[#5C7A7D] pl-0.5">
                  Joining Date
                </label>
                <input
                  type="date"
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                  className={selectClass}
                />
              </div>

              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    setDepartment("");
                    setStatus("");
                    setDesignation("");
                    setJoiningDate("");
                  }}
                  className="self-end text-[13px] font-medium text-[#2E9DA9] hover:text-[#1E6A73] transition-colors duration-200 ml-auto mb-0.5"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <EmployeeTable
        key={refresh}
        onEdit={handleEdit}
        search={search}
        department={department}
        status={status}
        designation={designation}
        joiningDate={joiningDate}
        page={page}
        limit={limit}
      />

      <div className="mt-4">
        <Pagination page={page} setPage={setPage} />
      </div>

      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSuccess={handleSuccess}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}

export default Employees;