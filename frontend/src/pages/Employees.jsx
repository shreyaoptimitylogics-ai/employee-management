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
  const [totalPages, setTotalPages] = useState(1);

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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const selectClass =
    "w-full px-3 py-2 rounded-lg border border-slate-200 text-[13px] text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors duration-150";

  const activeFilterCount = [department, status, designation, joiningDate].filter(
    Boolean
  ).length;

  return (
    <div className="max-w-[100%] mx-auto px-3 sm:px-6 py-5 sm:py-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-blue-700 shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div className="min-w-0">
          <h1 className="text-[18px] sm:text-[21px] font-semibold text-slate-900 leading-tight truncate">
            Employee Management
          </h1>
        </div>
      </div>

      {/* Search + Filters + Add */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">

        <div className="relative w-full sm:flex-1 sm:min-w-0 sm:max-w-xs">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, email or keyword…"
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-200 text-[13.5px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors duration-150"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap sm:ml-auto">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`relative inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-[13.5px] font-medium border transition-all duration-150 shrink-0 ${
              showFilters
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
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
              className={`transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`}
            >
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3Z" />
            </svg>
            <span className="hidden xs:inline sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span
                className={`flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-semibold transition-colors duration-150 ${
                  showFilters ? "bg-white text-blue-700" : "bg-blue-600 text-white"
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
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13.5px] font-medium bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] transition-all duration-150 shrink-0 shadow-sm"
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
            <span className="whitespace-nowrap">Add Employee</span>
          </button>
        </div>
      </div>

      {/* Filters panel */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          showFilters ? "grid-rows-[1fr] opacity-100 mb-5" : "grid-rows-[0fr] opacity-0 mb-0"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`relative overflow-hidden rounded-xl border border-slate-200 bg-white transform transition-all duration-300 ${
              showFilters ? "translate-y-0" : "-translate-y-3"
            }`}
          >
            <div className="h-[3px] w-full bg-gradient-to-r from-blue-600 to-blue-300" />

            <div className="flex flex-wrap items-end gap-3 p-4 bg-slate-50">
              <div className="flex flex-col gap-1 w-[calc(50%-0.375rem)] sm:w-auto sm:min-w-[150px]">
                <label className="text-[11px] font-medium text-slate-500 pl-0.5">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                    setPage(1);
                  }}
                  className={selectClass}

                >
                  <option value="">All Departments</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 w-[calc(50%-0.375rem)] sm:w-auto sm:min-w-[150px]">
                <label className="text-[11px] font-medium text-slate-500 pl-0.5">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setPage(1);
                  }}
                  className={selectClass}
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 w-[calc(50%-0.375rem)] sm:w-auto sm:min-w-[150px]">
                <label className="text-[11px] font-medium text-slate-500 pl-0.5">
                  Designation
                </label>
                <select
                  value={designation}
                  onChange={(e) => {
                    setDesignation(e.target.value);
                    setPage(1);
                  }}
                  className={selectClass}
                >
                  <option value="">All Designations</option>
                  <option value="Developer">Developer</option>
                  <option value="Manager">Manager</option>
                  <option value="Designer">Designer</option>
                  <option value="HR Executive">HR Executive</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 w-[calc(50%-0.375rem)] sm:w-auto sm:min-w-[150px]">
                <label className="text-[11px] font-medium text-slate-500 pl-0.5">
                  Joining Date
                </label>
                <input
                  type="date"
                  value={joiningDate}
                  onChange={(e) => {
                    setJoiningDate(e.target.value);
                    setPage(1);
                  }}
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
                    setPage(1);
                  }}
                  className="text-[13px] font-medium text-blue-600 hover:text-blue-800 transition-colors duration-150 w-full sm:w-auto sm:ml-auto text-left sm:text-right"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-hidden">
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
          onTotalPagesChange={setTotalPages}
        />
      </div>

      <div className="mt-4">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
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