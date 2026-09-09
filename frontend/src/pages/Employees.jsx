import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import Pagination from "../components/Pagination";

function FilterDropdown({ label, value, options, placeholder, onChange, selectClass }) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const allOptions = [{ label: placeholder, value: "" }, ...options];
  const current = allOptions.find((o) => o.value === value) || allOptions[0];

  const openMenu = () => {
    const rect = triggerRef.current.getBoundingClientRect();
    const menuHeight = allOptions.length * 30 + 8;
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpward = spaceBelow < menuHeight && rect.top > menuHeight;

    setMenuPos({
      left: rect.left,
      width: rect.width,
      top: openUpward ? undefined : rect.bottom + 4,
      bottom: openUpward ? window.innerHeight - rect.top + 4 : undefined,
    });
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;

    const handleOutside = (e) => {
      if (triggerRef.current?.contains(e.target) || menuRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    const handleScrollOrResize = () => setOpen(false);

    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [open]);

  return (
    <div className="flex flex-col gap-1 w-[calc(50%-0.3125rem)] sm:w-auto sm:min-w-[130px]">
      <label className="text-[10.5px] font-medium text-slate-500 pl-0.5">{label}</label>
      <button
        type="button"
        ref={triggerRef}
        onClick={() => (open ? setOpen(false) : openMenu())}
        className={`${selectClass} flex items-center justify-between gap-2 text-left`}
      >
        <span className={value ? "text-slate-800" : "text-slate-400"}>{current.label}</span>
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-slate-400 shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open &&
        menuPos &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              left: menuPos.left,
              top: menuPos.top,
              bottom: menuPos.bottom,
              width: menuPos.width,
            }}
            className="z-50 bg-white border border-slate-200 rounded-md shadow-lg py-1 overflow-hidden"
          >
            {allOptions.map((opt) => (
              <button
                key={opt.value || "all"}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 text-[12.5px] cursor-pointer hover:bg-slate-50 transition-colors ${
                  opt.value === value ? "bg-slate-50 font-medium text-slate-900" : "text-slate-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}

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
    "w-full px-2.5 py-1.5 rounded-md border border-slate-200 text-[12.5px] text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-colors duration-150 cursor-pointer";

  const activeFilterCount = [department, status, designation, joiningDate].filter(
    Boolean
  ).length;

  return (
    <div className="h-screen flex flex-col overflow-hidden max-w-[100%] mx-auto px-3 sm:px-6 py-4 sm:py-5">

      {/* Header — small and simple */}
      <div className="flex items-center gap-2 mb-3 shrink-0">
        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-indigo-50 text-blue-600 shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <h1 className="text-[13.5px] font-semibold text-slate-900 leading-tight truncate">
          Employee Management
        </h1>
      </div>

      {/* Search + Filters + Add */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 mb-3 shrink-0">

        <div className="relative w-full sm:flex-1 sm:min-w-0 sm:max-w-xs">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search employees…"
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-8 pr-3 py-2 rounded-md border border-slate-200 text-[12.5px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-colors duration-150"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap sm:ml-auto">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`relative inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-[12.5px] font-medium border transition-all duration-150 shrink-0 cursor-pointer ${
              showFilters
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
            }`}
          >
            <svg
              width="12"
              height="12"
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
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span
                className={`flex items-center justify-center w-3.5 h-3.5 rounded-full text-[9px] font-semibold transition-colors duration-150 ${
                  showFilters ? "bg-white text-indigo-700" : "bg-blue-600 text-white"
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
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-[12.5px] font-medium bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] transition-all duration-150 shrink-0 cursor-pointer"
          >
            <svg
              width="13"
              height="13"
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
        className={`grid transition-all duration-300 ease-in-out shrink-0 ${
          showFilters ? "grid-rows-[1fr] opacity-100 mb-3" : "grid-rows-[0fr] opacity-0 mb-0"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`relative overflow-hidden rounded-lg border border-slate-200 bg-white transform transition-all duration-300 ${
              showFilters ? "translate-y-0" : "-translate-y-3"
            }`}
          >
            <div className="h-[2px] w-full bg-indigo-500" />

            <div className="flex flex-wrap items-end gap-2.5 p-3 bg-slate-50">
              <FilterDropdown
                label="Department"
                value={department}
                placeholder="All Departments"
                selectClass={selectClass}
                options={[
                  { label: "IT", value: "IT" },
                  { label: "HR", value: "HR" },
                  { label: "Finance", value: "Finance" },
                  { label: "Marketing", value: "Marketing" },
                  { label: "Sales", value: "Sales" },
                  { label: "Operations", value: "Operations" },
                ]}
                onChange={(val) => {
                  setDepartment(val);
                  setPage(1);
                }}
              />

              <FilterDropdown
                label="Status"
                value={status}
                placeholder="All Status"
                selectClass={selectClass}
                options={[
                  { label: "Active", value: "Active" },
                  { label: "Inactive", value: "Inactive" },
                ]}
                onChange={(val) => {
                  setStatus(val);
                  setPage(1);
                }}
              />

              <FilterDropdown
                label="Designation"
                value={designation}
                placeholder="All Designations"
                selectClass={selectClass}
                options={[
                  { label: "Developer", value: "Developer" },
                  { label: "Manager", value: "Manager" },
                  { label: "Designer", value: "Designer" },
                  { label: "HR Executive", value: "HR Executive" },
                  { label: "Team Lead", value: "Team Lead" },
                  { label: "Intern", value: "Intern" },
                ]}
                onChange={(val) => {
                  setDesignation(val);
                  setPage(1);
                }}
              />

              <div className="flex flex-col gap-1 w-[calc(50%-0.3125rem)] sm:w-auto sm:min-w-[130px]">
                <label className="text-[10.5px] font-medium text-slate-500 pl-0.5">
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
                  className="text-[12px] font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-150 w-full sm:w-auto sm:ml-auto text-left sm:text-right cursor-pointer"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table area — fills remaining height, scrolls internally */}
      <div className="flex-1 min-h-0 overflow-hidden">
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

      <div className="pt-2.5 shrink-0">
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