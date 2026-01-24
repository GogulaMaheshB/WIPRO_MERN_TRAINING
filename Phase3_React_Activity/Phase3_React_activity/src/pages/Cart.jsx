import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, total } = useCart();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.map((item) => (
        <div key={item.id} className="flex justify-between mb-3 bg-white p-4 rounded">
          <div>
            <h3>{item.name}</h3>
            <p>₹{item.price} × {item.qty}</p>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}

      <h2 className="font-bold mt-4">Total: ₹{total}</h2>
    </div>
  );
}

export default Cart;
