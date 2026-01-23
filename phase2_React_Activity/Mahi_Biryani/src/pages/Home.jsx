import { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";

function Home() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/foods")
      .then(res => res.json())
      .then(data => setFoods(data));
  }, []);

  return (
    <>
      <section id="about" className="bg-yellow-100 p-10 text-center">
        <h1 className="text-3xl font-bold text-orange-700">About Us</h1>
        <p className="text-2xl font-bold text-orange-700">
        Authentic Biryani 🍗
      </p>
      <p className="mt-2 text-gray-600">
        Hot • Fresh • Delicious
      </p>
        <p className="mt-4 max-w-3xl mx-auto">
          Mahi Biryani serves authentic, hot, and delicious biryani in Kadiri
          using traditional recipes.
        </p>
      </section>

      <section className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foods.map(food => (
          <FoodCard key={food.id} food={food} />
        ))}
      </section>
    </>
  );
}

export default Home;
