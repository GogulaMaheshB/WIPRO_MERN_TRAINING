import { useEffect, useState } from "react";

function Admin() {
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  const submit = (e) => {
    e.preventDefault();

    const method = form.id ? "PUT" : "POST";
    const url = form.id
      ? `http://localhost:3000/foods/${form.id}`
      : "http://localhost:3000/foods";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        price: Number(form.price),
        image: form.image,
      }),
    })
      .then(() => {
        setForm({ id: null, name: "", price: "", image: "" });
        return fetch("http://localhost:3000/foods");
      })
      .then((res) => res.json())
      .then((data) => setFoods(data));
  };

  const remove = (id) => {
    fetch(`http://localhost:3000/foods/${id}`, {
      method: "DELETE",
    }).then(() =>
      setFoods((prev) => prev.filter((f) => f.id !== id))
    );
  };

  const edit = (food) => {
    setForm(food);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-3xl">
        {/* TITLE */}
        <h1 className="text-4xl font-bold text-orange-700 text-center mb-8">
          Admin Panel
        </h1>

        {/* FORM CARD */}
        <form
          onSubmit={submit}
          className="bg-white rounded-2xl shadow-xl p-6 mb-10 transition hover:shadow-2xl"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            {form.id ? "Update Food Item" : "Add New Food Item"}
          </h2>

          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Food Name"
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

            <input
              type="number"
              placeholder="Price"
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              required
            />

            <input
              type="text"
              placeholder="Image URL"
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={form.image}
              onChange={(e) =>
                setForm({ ...form, image: e.target.value })
              }
              required
            />

            <button
              type="submit"
              className={`py-3 rounded-lg text-white font-semibold transition transform hover:scale-[1.02] ${
                form.id
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {form.id ? "Update Food" : "Add Food"}
            </button>
          </div>
        </form>

        {/* FOOD LIST */}
        <div className="space-y-3">
          {foods.map((food) => (
            <div
              key={food.id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center transition hover:shadow-lg hover:scale-[1.01]"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {food.name}
                </p>
                <p className="text-gray-500">₹{food.price}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => edit(food)}
                  className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => remove(food.id)}
                  className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
