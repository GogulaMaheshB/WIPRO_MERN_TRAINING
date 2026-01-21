const Employee = ({ employee, onPromote }) => {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {employee.name}
        </h2>
        <p className="text-sm text-gray-500">
          {employee.role}
        </p>
      </div>

      <button
        onClick={() => onPromote(employee)}
        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
      >
        Promote
      </button>
    </div>
  );
};

export default Employee;
