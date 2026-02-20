import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const schema = Yup.object({
  name: Yup.string().required("Name required"),
  price: Yup.number().positive().required("Price required"),
  category: Yup.string().required("Category required"),
  description: Yup.string().min(10, "Minimum 10 characters")
});

function AddProduct() {
  const { setProducts } = useContext(ProductContext);

  return (
    <div className="container mt-4">
      <h3>Add Product</h3>

      <Formik
        initialValues={{ name: "", price: "", category: "", description: "" }}
        validationSchema={schema}
        onSubmit={async (values, { resetForm }) => {
          const res = await fetch("http://localhost:5000/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
          });
          const data = await res.json();
          setProducts(prev => [...prev, data]);
          resetForm();
        }}
      >
        <Form>
          <Field name="name" className="form-control mb-2" placeholder="Name" />
          <ErrorMessage name="name" component="div" className="text-danger" />

          <Field name="price" className="form-control mb-2" placeholder="Price" />
          <ErrorMessage name="price" component="div" className="text-danger" />

          <Field name="category" className="form-control mb-2" placeholder="Category" />
          <ErrorMessage name="category" component="div" className="text-danger" />

          <Field
            name="description"
            as="textarea"
            className="form-control mb-2"
            placeholder="Description"
          />
          <ErrorMessage name="description" component="div" className="text-danger" />

          <button className="btn btn-primary">Add</button>
        </Form>
      </Formik>
    </div>
  );
}

export default AddProduct;
