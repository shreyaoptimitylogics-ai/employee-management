// import React, { useState, useEffect } from 'react'
// import { getEmployees, getEmployeeById, updateEmployeeStatus, deleteEmployee } from '../services/employeeApi';
// import EmployeeDetails from '../pages/EmployeeDetails';

// const EmployeeTable = ({ onEdit, search, department, status, designation, joiningDate, page,
//   limit }) => {

//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [detailsLoading, setDetailsLoading] = useState(false);

//   useEffect(() => {
//     fetchEmployees();
//   }, [search, department, status, designation, joiningDate, page]);

//   const fetchEmployees = async () => {
//     try {
//       const params = {};

//       if (search) params.search = search;
//       if (department) params.department = department;
//       if (status) params.status = status;
//       if (designation) params.designation = designation;
//       if (joiningDate) params.joining_date = joiningDate;
//       const skip = (page - 1) * limit;

//       params.skip = skip;
//       params.limit = limit;

//       const response = await getEmployees(params);
//       setEmployees(response.data);
//     } catch (error) {
//       console.error("Failed to fetch employees:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleView = async (id) => {
//     try {
//       setDetailsLoading(true);
//       const response = await getEmployeeById(id);
//       setSelectedEmployee(response.data);
//     } catch (error) {
//       console.error("Failed to fetch employee:", error);
//     } finally {
//       setDetailsLoading(false);
//     }
//   };

//   const handleStatus = async (id, currentStatus) => {
//     try {
//       const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
//       await updateEmployeeStatus(id, newStatus);
//       fetchEmployees();
//     } catch (error) {
//       console.error("Failed to update employee status:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteEmployee(id);
//       fetchEmployees();
//     } catch (error) {
//       console.error("Failed to delete employee:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center gap-2.5 p-5 text-sm text-slate-500">
//         <div className="w-4 h-4 border-2 border-slate-200 border-t-slate-400 rounded-full animate-spin" />
//         <span>Loading employees...</span>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
//         <table className="w-full border-collapse text-[13.5px]">
//           <thead>
//             <tr>
//               <th className="text-left px-5 py-3.5 text-slate-400 font-medium text-xs uppercase tracking-wide border-b border-slate-200">ID</th>
//               <th className="text-left px-5 py-3.5 text-slate-400 font-medium text-xs uppercase tracking-wide border-b border-slate-200">Name</th>
//               <th className="text-left px-5 py-3.5 text-slate-400 font-medium text-xs uppercase tracking-wide border-b border-slate-200">Email</th>
//               <th className="text-left px-5 py-3.5 text-slate-400 font-medium text-xs uppercase tracking-wide border-b border-slate-200">Department</th>
//               <th className="text-left px-5 py-3.5 text-slate-400 font-medium text-xs uppercase tracking-wide border-b border-slate-200">Designation</th>
//               <th className="text-left px-5 py-3.5 text-slate-400 font-medium text-xs uppercase tracking-wide border-b border-slate-200">Status</th>
//               <th className="text-right px-5 py-3.5 text-slate-400 font-medium text-xs uppercase tracking-wide border-b border-slate-200">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {employees.length === 0 ? (
//               <tr>
//                 <td colSpan="7" className="text-center py-14 px-4 text-slate-400">
//                   No employees found
//                 </td>
//               </tr>
//             ) : (
//               employees.map((employee) => {
//                 const isActive = employee.status === "Active";
//                 return (
//                   <tr key={employee.id} className="hover:bg-slate-50 transition-colors">
//                     <td className="px-5 py-3.5 border-b border-slate-100 text-slate-400 tabular-nums">
//                       {employee.id}
//                     </td>
//                     <td className="px-5 py-3.5 border-b border-slate-100">
//                       <div className="flex items-center gap-3">
//                         <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-700 text-[11px] font-semibold shrink-0">
//                           {employee.first_name?.[0]}{employee.last_name?.[0]}
//                         </span>
//                         <span className="text-slate-800 font-medium">{employee.first_name} {employee.last_name}</span>
//                       </div>
//                     </td>
//                     <td className="px-5 py-3.5 border-b border-slate-100 text-slate-500">
//                       {employee.email}
//                     </td>
//                     <td className="px-5 py-3.5 border-b border-slate-100 text-slate-700">
//                       {employee.department}
//                     </td>
//                     <td className="px-5 py-3.5 border-b border-slate-100 text-slate-700">
//                       {employee.designation}
//                     </td>

//                     <td className="px-5 py-3.5 border-b border-slate-100">
//                       <button
//                         onClick={() => handleStatus(employee.id, employee.status)}
//                         className={`relative inline-flex items-center h-5 w-9 rounded-full transition-colors duration-200 ${
//                           isActive ? "bg-sky-400" : "bg-slate-200"
//                         }`}
//                       >
//                         <span
//                           className={`inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
//                             isActive ? "translate-x-[19px]" : "translate-x-[3px]"
//                           }`}
//                         />
//                       </button>
//                       <span className="ml-2.5 text-xs font-medium text-slate-500 align-middle">
//                         {employee.status}
//                       </span>
//                     </td>

//                     <td className="px-5 py-3.5 border-b border-slate-100">
//                       <div className="flex items-center justify-end gap-1">
//                         <button
//                           onClick={() => handleView(employee.id)}
//                           title="View"
//                           className="p-2 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
//                         >
//                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
//                             <circle cx="12" cy="12" r="3" />
//                           </svg>
//                         </button>

//                         <button
//                           onClick={() => onEdit(employee)}
//                           title="Edit"
//                           className="p-2 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
//                         >
//                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <path d="M12 20h9" />
//                             <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
//                           </svg>
//                         </button>

//                         <button
//                           onClick={() => handleDelete(employee.id)}
//                           title="Delete"
//                           className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
//                         >
//                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <path d="M3 6h18" />
//                             <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
//                             <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
//                             <path d="M10 11v6" />
//                             <path d="M14 11v6" />
//                           </svg>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       {detailsLoading && (
//         <div className="flex items-center gap-2.5 p-5 text-sm text-slate-500">
//           <div className="w-4 h-4 border-2 border-slate-200 border-t-slate-400 rounded-full animate-spin" />
//           <span>Loading employee details...</span>
//         </div>
//       )}

//       {selectedEmployee && (
//         <EmployeeDetails
//           employee={selectedEmployee}
//           onClose={() => setSelectedEmployee(null)}
//         />
//       )}
//     </>
//   )
// }

// export default EmployeeTable


import React, { useState, useEffect } from 'react'
import { getEmployees, getEmployeeById, updateEmployeeStatus, deleteEmployee } from '../services/employeeApi';
import EmployeeDetails from '../pages/EmployeeDetails';

const EmployeeTable = ({ onEdit, search, department, status, designation, joiningDate, page,
  limit }) => {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

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
      params.limit = limit;

      const response = await getEmployees(params);
      setEmployees(response.data);
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
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      await updateEmployeeStatus(id, newStatus);
      fetchEmployees();
    } catch (error) {
      console.error("Failed to update employee status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-3 p-6 text-[13px] text-[#5C7A7D]">
        <div className="w-3.5 h-3.5 border-2 border-[#DCE9EA] border-t-[#2E9DA9] rounded-full animate-spin" />
        <span>Loading roster…</span>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white border border-[#DCE9EA] rounded-md overflow-hidden">
        <table className="w-full border-collapse text-[13.5px]">
          <thead>
            <tr className="border-b border-[#14231C]">
              <th className="text-left px-5 py-3 font-medium text-[11px] text-[#8AA3A5]">No.</th>
              <th className="text-left px-5 py-3 font-medium text-[11px] text-[#8AA3A5]">Name</th>
              <th className="text-left px-5 py-3 font-medium text-[11px] text-[#8AA3A5]">Email</th>
              <th className="text-left px-5 py-3 font-medium text-[11px] text-[#8AA3A5]">Department</th>
              <th className="text-left px-5 py-3 font-medium text-[11px] text-[#8AA3A5]">Designation</th>
              <th className="text-left px-5 py-3 font-medium text-[11px] text-[#8AA3A5]">Status</th>
              <th className="text-right px-5 py-3 font-medium text-[11px] text-[#8AA3A5]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-16 px-4 text-[#8AA3A5]">
                  No records match these filters.
                </td>
              </tr>
            ) : (
              employees.map((employee) => {
                const isActive = employee.status === "Active";
                return (
                  <tr key={employee.id} className="hover:bg-[#F4FBFB] transition-colors border-b border-[#EAF3F3] last:border-b-0">
                    <td className="px-5 py-3.5 text-[#A9C1C3] font-mono text-[12px] tabular-nums">
                      {String(employee.id).padStart(3, '0')}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#DFF1F2] text-[#2E9DA9] text-[11px] font-semibold shrink-0">
                          {employee.first_name?.[0]}{employee.last_name?.[0]}
                        </span>
                        <span className="text-[#14231C] font-medium">{employee.first_name} {employee.last_name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[#5C7A7D]">
                      {employee.email}
                    </td>
                    <td className="px-5 py-3.5 text-[#14231C]">
                      {employee.department}
                    </td>
                    <td className="px-5 py-3.5 text-[#14231C]">
                      {employee.designation}
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStatus(employee.id, employee.status)}
                          title={isActive ? "Set Inactive" : "Set Active"}
                          className={`relative inline-flex items-center h-4 w-7 rounded-full transition-colors duration-200 shrink-0 ${
                            isActive ? "bg-[#2E9DA9]" : "bg-[#DCE9EA]"
                          }`}
                        >
                          <span
                            className={`inline-block h-[10px] w-[10px] transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                              isActive ? "translate-x-[15px]" : "translate-x-[3px]"
                            }`}
                          />
                        </button>
                        <span className={`text-[12px] font-medium ${isActive ? "text-[#2E9DA9]" : "text-[#8AA3A5]"}`}>
                          {employee.status}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleView(employee.id)}
                          title="View"
                          className="p-1.5 rounded text-[#A9C1C3] hover:text-[#2E9DA9] hover:bg-[#DFF1F2] transition-colors"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>

                        <button
                          onClick={() => onEdit(employee)}
                          title="Edit"
                          className="p-1.5 rounded text-[#A9C1C3] hover:text-[#2E9DA9] hover:bg-[#DFF1F2] transition-colors"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                          </svg>
                        </button>

                        <button
                          onClick={() => handleDelete(employee.id)}
                          title="Delete"
                          className="p-1.5 rounded text-[#A9C1C3] hover:text-[#A6432E] hover:bg-[#F5E9E5] transition-colors"
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
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {detailsLoading && (
        <div className="flex items-center gap-3 p-5 text-[13px] text-[#5C7A7D]">
          <div className="w-3.5 h-3.5 border-2 border-[#DCE9EA] border-t-[#2E9DA9] rounded-full animate-spin" />
          <span>Loading employee details…</span>
        </div>
      )}

      {selectedEmployee && (
        <EmployeeDetails
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </>
  )
}

export default EmployeeTable