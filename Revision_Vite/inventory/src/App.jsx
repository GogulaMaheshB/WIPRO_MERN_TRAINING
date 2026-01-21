import { useState } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import EmployeeList from "./Components/EmployeeList";

function App() {
  const [stock, setStock] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center justify-between bg-gradient-to-br from-blue-100 to-indigo-200 mt-2">
      {/* <div className="bg-white w-96 rounded-2xl shadow-xl p-8">
        
        
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">
          Inventory Dashboard
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Manager Control Panel
        </p>

        
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-6 text-center">
          <p className="text-sm text-gray-500 mb-1">
            Current Stock
          </p>
          <h2 className="text-4xl font-bold text-indigo-700">
            {stock}
          </h2>
        </div>

    
        <div className="flex gap-4">
          <button
            onClick={() => setStock(stock + 1)}
            className="flex-1 py-3 rounded-xl font-semibold text-white 
                       bg-green-500 hover:bg-green-600 active:scale-95 
                       transition"
          >
            ➕ Add Stock
          </button>

          <button
            onClick={() => setStock(stock - 1)}
            disabled={stock === 0}
            className={`flex-1 py-3 rounded-xl font-semibold text-white 
              transition active:scale-95
              ${
                stock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
          >
            ➖ Remove Stock
          </button>
        </div>

    
        <p className="text-xs text-center text-gray-400 mt-6">
          Stock cannot go below zero
        </p>
        <div className="flex">
        
        <span>Product Price:   </span>
        <FaIndianRupeeSign />
        <span>70000</span>
        </div>

      
      </div> */}
      <div className="min-h-screen bg-gray-100 p-6 mt-3">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Employee Management
      </h1>

      <EmployeeList />
    </div>
    </div>
  );
}

export default App;
