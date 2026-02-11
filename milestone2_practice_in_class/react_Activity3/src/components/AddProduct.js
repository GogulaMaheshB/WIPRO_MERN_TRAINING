import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import { ProductContext } from './ProductContext';

function AddProduct() {
  const { addProduct } = useContext(ProductContext);

  const initialValues = {
    name: '',
    category: '',
    price: ''
  };

  const validationSchema = Yup.object({
    
    name: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    price: Yup.number().required('Required')
  });

  const onSubmit = (values, { resetForm }) => {
    fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(data => {
        addProduct(data);
        resetForm();
      });
  };

  return (
    <div>
      <h2>Add Product</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div>
            <hr/>
            <Field name="name" placeholder="Name" />
            <ErrorMessage name="name" />
            <hr/>
          </div>

          <div>
            <hr/>
            <Field name="category" placeholder="Category" />
            <ErrorMessage name="category" />
            <hr/>
          </div>

          <div>
            <hr/>
            <Field name="price" placeholder="Price" />
            <ErrorMessage name="price" />
            <hr/>
          </div>

          <button type="submit">Add</button>
        </Form>
      </Formik>
    </div>
  );
}

export default AddProduct;
