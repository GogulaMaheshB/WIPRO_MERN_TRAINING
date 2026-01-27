import { Link } from "react-router-dom";
import { useState } from "react";
import CartStore from "../stores/cartStore";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartState, setCartState] = useState({
    cart: CartStore.getCart(),
  });

  CartStore.subscribe(setCartState);

  const count = cartState.cart.reduce((s, i) => s + i.qty, 0);

  return (
    <nav className="bg-gradient-to-r from-orange-600 to-yellow-400 text-white">
      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img
            src="data:image/png;base64,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"
            alt="Biryani Logo"
            className="w-10 h-10"
          />
          <h1 className="text-xl font-bold">Mahi Biryani</h1>
        </div>

        {/* DESKTOP SEARCH */}
        <input
          type="text"
          placeholder="Search food..."
          className="hidden md:block px-3 py-1 rounded text-black"
        />

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-5 font-medium">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart" className="border px-3 py-1 rounded">
            Cart ({count})
          </Link>
          <Link to="/admin-login">Admin</Link>
        </div>

        {/* MOBILE RIGHT */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            to="/cart"
            className="border px-3 py-1 rounded text-sm"
          >
            🛒 {count}
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-orange-500 px-4 pb-4 space-y-3">
          <input
            type="text"
            placeholder="Search food..."
            className="w-full px-3 py-2 rounded text-black"
          />

          <Link onClick={() => setOpen(false)} to="/" className="block">
            Home
          </Link>
          <Link onClick={() => setOpen(false)} to="/about" className="block">
            About
          </Link>
          <Link onClick={() => setOpen(false)} to="/contact" className="block">
            Contact
          </Link>
          <Link onClick={() => setOpen(false)} to="/admin-login" className="block">
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

