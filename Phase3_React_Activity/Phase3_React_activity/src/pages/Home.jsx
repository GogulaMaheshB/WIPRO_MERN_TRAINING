import { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";

function Home() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/foods")
      .then((res) => res.json())
      .then(setFoods);
  }, []);

  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">
      {foods.map((f) => (
        <FoodCard key={f.id} food={f} />
      ))}
    </div>
  );
}

export default Home;
