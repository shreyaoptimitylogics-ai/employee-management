function EmployeeDetails({ employee, onClose }) {
  if (!employee) {
    return null;
  }

  const isActive = employee.status === "Active";

  const Row = ({ label, value }) => (
    <div className="flex items-center justify-between py-3 border-b border-[#F1F0F7] last:border-b-0 gap-4">
      <span className="text-[13px] text-[#6B6785] shrink-0">{label}</span>
      <span className="text-[13.5px] text-[#1D1B31] font-medium text-right break-words">{value || "—"}</span>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D1B31]/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-[#F1F0F7]">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-50 text-blue-600 text-[13px] font-semibold shrink-0">
              {employee.first_name?.[0]}{employee.last_name?.[0]}
            </span>
            <h2 className="text-[15px] font-semibold text-[#1D1B31] truncate">
              {employee.first_name} {employee.last_name}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-[#ADAAC4] hover:text-[#1D1B31] hover:bg-[#FAFAFC] transition-colors duration-150 shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="px-5 sm:px-6 py-2">
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
              <span className={`inline-flex items-center gap-1.5 font-medium ${isActive ? "text-blue-600" : "text-[#A6A3BE]"}`}>
                <span className={`w-[6px] h-[6px] rounded-full ${isActive ? "bg-blue-600" : "bg-[#ADAAC4]"}`} />
                {employee.status}
              </span>
            }
          />
        </div>

        <div className="px-5 sm:px-6 py-5">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-150"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;