import React, { useState, useEffect } from 'react'
import { getEmployees, getEmployeeById, updateEmployeeStatus, deleteEmployee } from '../services/employeeApi';
import EmployeeDetails from '../pages/EmployeeDetails';

const EmployeeTable = ({ onEdit, search, department, status, designation, joiningDate, page,
                         limit, onTotalPagesChange }) => {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const [totalCount, setTotalCount] = useState(null);

  // NEW: which employee is pending delete confirmation
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, [search, department, status, designation, joiningDate, page]);

  const fetchEmployees = async () => {
    try {
      const params = {};

      if (search) params.search = search;
      if (department) params.department = department;
      if (status) params.status = status;
      if (designation) params.designation = designation;
      if (joiningDate) params.joining_date = joiningDate;
      const skip = (page - 1) * limit;

      params.skip = skip;
      // Ask for one extra row beyond the page size. If it comes back, we KNOW
      // there's a next page — no more guessing based on "is this page full".
      // This is what was causing the phantom page 4 when the last page was
      // exactly `limit` items long.
      params.limit = limit + 1;

      const response = await getEmployees(params);

      const raw = response.data;

      let employeeList = [];
      let total = null;

      if (Array.isArray(raw)) {
        employeeList = raw;
        total = null;
      } else if (raw && typeof raw === "object") {
        employeeList =
          raw.data ?? raw.items ?? raw.employees ?? raw.results ?? [];
        total =
          raw.total ?? raw.total_count ?? raw.count ?? raw.totalCount ?? null;
      }

      // Did the extra "peek" row come back? Then there's a next page.
      const hasNextPage = employeeList.length > limit;
      // Trim it off — we only ever want to *display* `limit` rows.
      employeeList = employeeList.slice(0, limit);

      setEmployees(employeeList);
      setTotalCount(total);

      if (onTotalPagesChange) {
        if (total !== null && Number.isFinite(total)) {
          // Backend gave us a real count — trust it directly.
          onTotalPagesChange(Math.ceil(total / limit));
        } else {
          // No count from backend — derive it from whether the peek row existed,
          // instead of assuming "page is full => there must be more".
          onTotalPagesChange(hasNextPage ? page + 1 : page);
        }
      }
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (id) => {
    try {
      setDetailsLoading(true);
      const response = await getEmployeeById(id);
      setSelectedEmployee(response.data);
    } catch (error) {
      console.error("Failed to fetch employee:", error);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleStatus = async (id, currentStatus) => {
    try {
      const isCurrentlyActive = currentStatus?.toLowerCase() === "active";
      const newStatus = isCurrentlyActive ? "Inactive" : "Active";
      await updateEmployeeStatus(id, newStatus);
      fetchEmployees();
    } catch (error) {
      console.error("Failed to update employee status:", error);
    }
  };


  const requestDelete = (employee) => {
    setEmployeeToDelete(employee);
  };


  const confirmDelete = async () => {
    if (!employeeToDelete) return;
    try {
      setDeleting(true);
      await deleteEmployee(employeeToDelete.id);
      fetchEmployees();
    } catch (error) {
      console.error("Failed to delete employee:", error);
    } finally {
      setDeleting(false);
      setEmployeeToDelete(null);
    }
  };

  const cancelDelete = () => {
    setEmployeeToDelete(null);
  };

  const rangeStart = employees.length === 0 ? 0 : (page - 1) * limit + 1;
  const rangeEnd = (page - 1) * limit + employees.length;


  const scrollWrapClass = "custom-scrollbar";

  if (loading) {
    return (
      <div className="flex items-center gap-3 p-6 text-[13px] text-slate-500">
        <div className="w-3.5 h-3.5 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
        <span>Loading....</span>
      </div>
    );
  }

  const ActionButtons = ({ employee }) => (
    <div className="flex items-center justify-end gap-1.5">
      <button
        onClick={() => handleView(employee.id)}
        title="View"
        className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>

      <button
        onClick={() => onEdit(employee)}
        title="Edit"
        className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      </button>

      <button
        onClick={() => requestDelete(employee)}
        title="Delete"
        className="p-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      </button>
    </div>
  );

  const StatusBadge = ({ employee }) => {
    const isActive = employee.status?.toLowerCase() === "active";
    return (
      <button
        onClick={() => handleStatus(employee.id, employee.status)}
        title={isActive ? "Set Inactive" : "Set Active"}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
          isActive
            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            : "bg-red-50 text-red-600 hover:bg-red-100"
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-emerald-500" : "bg-red-500"}`} />
        {isActive ? "Active" : "Inactive"}
      </button>
    );
  };

  return (

    <div className="h-full flex flex-col">
      <div className="mb-3 shrink-0">
        <span className="text-[13px] text-slate-500">
          {totalCount !== null
            ? `Showing ${rangeStart}\u2013${rangeEnd} of ${totalCount} employees`
            : `Showing ${employees.length} employees`}
        </span>
      </div>

      {employees.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm text-center py-16 px-4 text-slate-400 text-[13.5px]">
          No records match these filters.
        </div>
      ) : (
        <>

          <div className="lg:hidden flex-1 min-h-0 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
            <div className={`flex-1 min-h-0 overflow-y-auto overflow-x-auto ${scrollWrapClass}`}>
              <table className="w-full border-collapse text-[10.5px]">
                <thead className="sticky top-0 z-10">
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-2 py-2 font-semibold text-[9px] tracking-wide uppercase text-slate-500 bg-slate-50">No.</th>
                  <th className="text-left px-2 py-2 font-semibold text-[9px] tracking-wide uppercase text-slate-500 bg-slate-50">Name</th>
                  <th className="text-left px-2 py-2 font-semibold text-[9px] tracking-wide uppercase text-slate-500 bg-slate-50">Dept</th>
                  <th className="text-left px-2 py-2 font-semibold text-[9px] tracking-wide uppercase text-slate-500 bg-slate-50">Status</th>
                  <th className="text-right px-2 py-2 font-semibold text-[9px] tracking-wide uppercase text-slate-500 bg-slate-50">Actions</th>
                </tr>
                </thead>

                <tbody>
                {employees.map((employee, idx) => {
                  const isActive = employee.status?.toLowerCase() === "active";
                  return (
                    <tr
                      key={employee.id}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="px-2 py-2 text-slate-400 font-mono text-[9.5px] tabular-nums whitespace-nowrap">
                        {String((page - 1) * limit + idx + 1).padStart(3, '0')}
                      </td>
                      <td className="px-2 py-2 max-w-[90px]">
                        <p className="text-slate-800 font-medium truncate whitespace-nowrap">
                          {employee.first_name} {employee.last_name}
                        </p>
                        <p className="text-slate-400 truncate whitespace-nowrap text-[9.5px]">{employee.email}</p>
                      </td>
                      <td className="px-2 py-2 max-w-[60px]">
                        <span className="inline-block max-w-full truncate whitespace-nowrap px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[9.5px] font-medium">
                          {employee.department}
                        </span>
                      </td>
                      <td className="px-2 py-2">
                        <button
                          onClick={() => handleStatus(employee.id, employee.status)}
                          title={isActive ? "Set Inactive" : "Set Active"}
                          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9.5px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                            isActive
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          <span className={`w-1 h-1 rounded-full shrink-0 ${isActive ? "bg-emerald-500" : "bg-red-500"}`} />
                          {isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex items-center justify-start gap-0.5">
                          <button
                            onClick={() => handleView(employee.id)}
                            title="View"
                            className="p-1 rounded-full bg-blue-50 text-blue-600 cursor-pointer"
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </button>
                          <button
                            onClick={() => onEdit(employee)}
                            title="Edit"
                            className="p-1 rounded-full bg-blue-50 text-blue-600 cursor-pointer"
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => requestDelete(employee)}
                            title="Delete"
                            className="p-1 rounded-full bg-red-50 text-red-600 cursor-pointer"
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18" />
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                              <path d="M10 11v6" />
                              <path d="M14 11v6" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
          </div>


          <div className="hidden lg:flex flex-1 min-h-0 bg-white border border-slate-200 rounded-xl shadow-sm flex-col overflow-hidden">
            <div className={`flex-1 min-h-0 overflow-y-auto overflow-x-auto ${scrollWrapClass}`}>
              <table className="w-full table-fixed border-collapse text-[13.5px]">
                <thead className="sticky top-0 z-10">
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-center px-3 py-3 font-semibold text-[11px] tracking-wide uppercase text-slate-500 w-[6%] bg-slate-50">No.</th>
                  <th className="text-center px-3 py-3 font-semibold text-[11px] tracking-wide uppercase text-slate-500 w-[14%] bg-slate-50">Name</th>
                  <th className="text-center px-3 py-3 font-semibold text-[11px] tracking-wide uppercase text-slate-500 w-[18%] bg-slate-50">Email</th>
                  <th className="text-center px-3 py-3 font-semibold text-[11px] tracking-wide uppercase text-slate-500 w-[12%] bg-slate-50">Department</th>
                  <th className="text-center px-3 py-3 font-semibold text-[11px] tracking-wide uppercase text-slate-500 w-[14%] bg-slate-50">Designation</th>
                  <th className="text-center px-3 py-3 font-semibold text-[11px] tracking-wide uppercase text-slate-500 w-[10%] bg-slate-50">Status</th>
                  <th className="text-center px-3 py-3 font-semibold text-[11px] tracking-wide uppercase text-slate-500 w-[13%] bg-slate-50">Joining Date</th>
                  <th className="text-right  px-3 py-3 font-semibold text-[11px] tracking-wide uppercase text-slate-500 w-[13%] bg-slate-50">Actions</th>
                </tr>
                </thead>

                <tbody>
                {employees.map((employee, idx) => (
                  <tr
                    key={employee.id}
                    className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
                  >
                    <td className="px-3 py-3.5 text-slate-400 font-mono text-[12px] tabular-nums">
                      {String((page - 1) * limit + idx + 1).padStart(3, '0')}
                    </td>
                    <td className="px-3 py-3.5 truncate">
                      <span className="text-slate-800 font-medium truncate block">{employee.first_name} {employee.last_name}</span>
                    </td>
                    <td className="px-3 py-3.5 text-slate-500 truncate">
                      {employee.email}
                    </td>
                    <td className="px-3 py-3.5 text-center">
                        <span className="inline-block max-w-full truncate px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[12px] font-medium">
                          {employee.department}
                        </span>
                    </td>
                    <td className="px-3 py-3.5 text-slate-700 truncate text-center">
                      {employee.designation}
                    </td>

                    <td className="px-3 py-3.5 text-center">
                      <StatusBadge employee={employee} />
                    </td>

                    <td className="px-3 py-3.5 text-slate-500">
                      <div className="flex items-center justify-center gap-1.5">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 shrink-0">
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <path d="M16 2v4" />
                          <path d="M8 2v4" />
                          <path d="M3 10h18" />
                        </svg>
                        <span className="truncate">{employee.joining_date}</span>
                      </div>
                    </td>

                    <td className="px-3 py-3.5">
                      <ActionButtons employee={employee} />
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {detailsLoading && (
        <div className="flex items-center gap-3 p-5 text-[13px] text-slate-500">
          <div className="w-3.5 h-3.5 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
          <span>Loading employee details…</span>
        </div>
      )}

      {selectedEmployee && (
        <EmployeeDetails
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}


      {employeeToDelete && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1D1B31]/40 backdrop-blur-sm p-4"
          onClick={cancelDelete}
        >
          <div
            className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-red-50 text-red-600 mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
              </svg>
            </div>

            <h3 className="text-[15px] font-semibold text-[#1D1B31] text-center mb-1.5">
              Delete Employee?
            </h3>
            <p className="text-[13px] text-slate-500 text-center mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium text-slate-700">
                {employeeToDelete.first_name} {employeeToDelete.last_name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={cancelDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors duration-150 cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition-colors duration-150 cursor-pointer"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployeeTable