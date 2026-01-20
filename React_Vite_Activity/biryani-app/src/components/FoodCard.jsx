function FoodCard({ food, addToCart }) {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition hover:bg-amber-100 cursor-pointer">
      <img
        src={food.img}
        alt={food.name}
        className="h-48 w-full object-cover rounded-t-lg"
      />

      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{food.name}</h3>
        <p className="text-gray-600">{food.price}</p>

        <button
          onClick={addToCart}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default FoodCard;
