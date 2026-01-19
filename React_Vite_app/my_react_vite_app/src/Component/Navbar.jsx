import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-slate-800 text-white px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold">Great Learning</h1>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li className="hover:text-sky-400 cursor-pointer">Home</li>
          <li className="hover:text-sky-400 cursor-pointer">Courses</li>
          <li className="hover:text-sky-400 cursor-pointer">About</li>
          <li className="hover:text-sky-400 cursor-pointer">Contact</li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden mt-4 space-y-3">
          <li className="hover:text-sky-400">Home</li>
          <li className="hover:text-sky-400">Courses</li>
          <li className="hover:text-sky-400">About</li>
          <li className="hover:text-sky-400">Contact</li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
