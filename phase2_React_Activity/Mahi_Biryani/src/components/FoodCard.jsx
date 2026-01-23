function FoodCard({ food }) {
  return (
    <div className="
  border rounded-3xl bg-white overflow-hidden
  shadow transition-transform duration-300
  hover:scale-105 hover:shadow-xl hover:bg-amber-200
">

      <div className="h-48 bg-gray-200">
        <img
          src={`${food.image}?v=${food.id}`}
          alt={food.name}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x300?text=Biryani";
          }}
        />
      </div>

      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{food.name}</h3>
        <p className="text-gray-600">₹{food.price}</p>
        <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default FoodCard;
