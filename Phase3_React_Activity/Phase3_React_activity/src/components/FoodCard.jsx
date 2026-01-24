import { useCart } from "../context/CartContext";

function FoodCard({ food }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow hover:scale-105 transition">
      <img
        src={food.image}
        className="h-40 w-full object-cover rounded-t-xl"
      />
      <div className="p-4 text-center">
        <h3 className="font-semibold">{food.name}</h3>
        <p>₹{food.price}</p>
        <button
          onClick={() => addToCart(food)}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default FoodCard;
