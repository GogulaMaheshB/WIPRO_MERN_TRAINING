import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import AuthStore from "../stores/authStore";

const API = "http://localhost:3000/foods";

function Admin() {
  const [foods, setFoods] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const navigate = useNavigate();

  // ======================
  // FETCH FOODS (GET)
  // ======================
  const fetchFoods = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setFoods(data);
  };

  useEffect(() => {
    fetchFoods();

    // 🔐 IMPORTANT:
    // When admin page unmounts (back button / route change),
    // force logout so login is required again
    return () => {
      AuthStore.logout();
    };
  }, []);

  // ======================
  // LOGOUT
  // ======================
  const handleLogout = () => {
    AuthStore.logout();
    navigate("/admin-login", { replace: true });
  };

  // ======================
  // ADD / UPDATE (POST, PUT)
  // ======================
  const handleSubmit = async (values, { resetForm }) => {
    const method = editItem ? "PUT" : "POST";
    const url = editItem ? `${API}/${editItem.id}` : API;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        price: Number(values.price),
        image: values.image,
      }),
    });

    resetForm();
    setEditItem(null);
    fetchFoods();
  };

  // ======================
  // DELETE
  // ======================
  const deleteFood = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchFoods();
  };

  return (
    <div className="min-h-screen bg-amber-200 p-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-orange-700">
          Admin Panel
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* ======================
          FORM (Formik + Yup)
      ====================== */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow mb-10">
        <Formik
          enableReinitialize
          initialValues={{
            name: editItem?.name || "",
            price: editItem?.price || "",
            image: editItem?.image || "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Food name required"),
            price: Yup.number()
              .typeError("Enter valid price")
              .required("Price required"),
            image: Yup.string().url("Enter valid image URL").required(),
          })}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <h2 className="text-xl font-semibold text-center">
              {editItem ? "Update Food Item" : "Add Food Item"}
            </h2>

            <div>
              <Field
                name="name"
                placeholder="Food Name"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field
                name="price"
                placeholder="Price"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="price"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field
                name="image"
                placeholder="Image URL"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="image"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <button
  type="button"
  onClick={() => setEditItem(food)}
  className="bg-blue-500 text-white px-3 py-1 rounded"
>
  Edit
</button>

<button
  type="button"
  onClick={() => deleteFood(food.id)}
  className="bg-red-500 text-white px-3 py-1 rounded"
>
  Delete
</button>

          </Form>
        </Formik>
      </div>

      {/* ======================
          FOOD LIST
      ====================== */}
      <div className="max-w-xl mx-auto space-y-3">
        {foods.map((food) => (
          <div
            key={food.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <img
              src={food.image}
              alt={food.name}
              className="w-24 h-20 object-cover rounded"
            />

            <div>
              <p className="font-semibold">{food.name}</p>
              <p className="text-gray-600">₹{food.price}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditItem(food)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteFood(food.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
