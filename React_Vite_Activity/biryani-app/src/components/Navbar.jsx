function Navbar({ cartCount }) {
  return (
    <nav className="bg-orange-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Mahi Biryani</h1>

      <div className="flex gap-6 items-center">
        <span>Home</span>
        <span>Menu</span>
        <span>Contact</span>

        <button className="bg-white text-orange-600 px-3 py-1 rounded font-semibold">
          Cart ({cartCount})
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
