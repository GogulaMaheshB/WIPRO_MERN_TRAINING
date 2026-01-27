import { useEffect, useState } from "react";
import CartStore from "../stores/cartStore";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // initial load
    setCart(CartStore.getCart());
    setTotal(CartStore.getTotal());

    // subscribe to store
    CartStore.subscribe(({ cart, total }) => {
      setCart(cart);
      setTotal(total);
    });
  }, []);

  const handlePayment = () => {
    if (cart.length === 0) {
      alert("Your cart is empty ❌");
      return;
    }

    alert(`✅ Payment Successful!\nAmount Paid: ₹${total}`);
    CartStore.clear();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-700">
        Your Cart
      </h1>

      {cart.length === 0 && (
        <p className="text-gray-600 text-center">No items in cart</p>
      )}

      {cart.map(item => (
        <div
          key={item.id}
          className="flex justify-between items-center bg-white p-4 mb-4 rounded-xl shadow"
        >
          <div className="flex gap-4 items-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded object-cover"
            />

            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p>₹{item.price} × {item.qty}</p>
            </div>
          </div>

          <button
            onClick={() => CartStore.remove(item.id)}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow mt-6">
          <div className="flex justify-center text-xl font-bold mb-4">
            <span>Total  :   </span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg"
          >
            Proceed to Payment ₹{total}
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
