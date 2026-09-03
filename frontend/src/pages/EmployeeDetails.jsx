// function EmployeeDetails({ employee, onClose }) {
//   if (!employee) {
//     return null;
//   }

//   return (
//     <div>
//       <div>
//         <h2>Employee Details</h2>

//         <button onClick={onClose}>Close</button>

//         <hr />

//         <p>
//           <strong>Name:</strong>{" "}
//           {employee.first_name} {employee.last_name}
//         </p>

//         <p>
//           <strong>Email:</strong> {employee.email}
//         </p>

//         <p>
//           <strong>Phone:</strong> {employee.phone}
//         </p>

//         <p>
//           <strong>Age:</strong> {employee.age}
//         </p>

//         <p>
//           <strong>Department:</strong> {employee.department}
//         </p>

//         <p>
//           <strong>Designation:</strong> {employee.designation}
//         </p>

//         <p>
//           <strong>Salary:</strong> {employee.salary}
//         </p>

//         <p>
//           <strong>Joining Date:</strong> {employee.joining_date}
//         </p>

//         <p>
//           <strong>Status:</strong> {employee.status}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default EmployeeDetails;



function EmployeeDetails({ employee, onClose }) {
  if (!employee) {
    return null;
  }

  const isActive = employee.status === "Active";

  const Row = ({ label, value }) => (
    <div className="flex items-center justify-between py-3 border-b border-[#EAF3F3] last:border-b-0">
      <span className="text-[13px] text-[#5C7A7D]">{label}</span>
      <span className="text-[13.5px] text-[#14231C] font-medium">{value || "—"}</span>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#14231C]/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EAF3F3]">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#DFF1F2] text-[#2E9DA9] text-[13px] font-semibold shrink-0">
              {employee.first_name?.[0]}{employee.last_name?.[0]}
            </span>
            <h2 className="text-[15px] font-semibold text-[#14231C]">
              {employee.first_name} {employee.last_name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9FB3B5] hover:text-[#14231C] hover:bg-[#F4FBFB] transition-colors duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-2">
          <Row label="Email" value={employee.email} />
          <Row label="Phone" value={employee.phone} />
          <Row label="Age" value={employee.age} />
          <Row label="Department" value={employee.department} />
          <Row label="Designation" value={employee.designation} />
          <Row label="Salary" value={employee.salary} />
          <Row label="Joining Date" value={employee.joining_date} />
          <Row
            label="Status"
            value={
              <span className={`inline-flex items-center gap-1.5 font-medium ${isActive ? "text-[#2E9DA9]" : "text-[#8AA3A5]"}`}>
                <span className={`w-[6px] h-[6px] rounded-full ${isActive ? "bg-[#2E9DA9]" : "bg-[#9FB3B5]"}`} />
                {employee.status}
              </span>
            }
          />
        </div>

        <div className="px-6 py-5">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-[#2E9DA9] text-white hover:bg-[#25818C] transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;