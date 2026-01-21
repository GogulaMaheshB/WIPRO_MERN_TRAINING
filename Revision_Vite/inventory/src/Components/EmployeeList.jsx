import { useState } from "react";
import Employee from "./Employee";

const EmployeeList = () => {
  const [employees] = useState([
    { id: 1, name: "Mahesh", role: "Software Engineer" },
    { id: 2, name: "Ravi", role: "Frontend Developer" },
    { id: 3, name: "Suresh", role: "Backend Developer" },
  ]);

  const handlePromote = (employee) => {
    if (employee.name === "Mahesh") {
      alert("Mahesh is promoted");
    } else {
      alert("Check Employee Name");
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      {employees.map((emp) => (
        <Employee
          key={emp.id}
          employee={emp}
          onPromote={handlePromote}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
