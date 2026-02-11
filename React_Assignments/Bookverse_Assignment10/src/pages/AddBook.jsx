import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import BookActions from "../flux/actions/BookActions"

const AddBook = () => {
  const validationSchema = Yup.object({
    title: Yup.string().required("Title required"),
    author: Yup.string().required("Author required"),
    price: Yup.number().required("Price required")
  })

  return (
    <div className="max-w-md mx-auto mt-10 bg-white/10 p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Add New Book</h2>

      <Formik
        initialValues={{ title: "", author: "", price: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          BookActions.addBook(values)
          resetForm()
        }}
      >
        <Form className="space-y-4">
          <Field name="title" placeholder="Title" className="input" />
          <ErrorMessage name="title" component="div" className="text-red-400"/>

          <Field name="author" placeholder="Author" className="input" />
          <ErrorMessage name="author" component="div" className="text-red-400"/>

          <Field name="price" type="number" placeholder="Price" className="input" />
          <ErrorMessage name="price" component="div" className="text-red-400"/>

          <button className="bg-pink-500 px-4 py-2 rounded">
            Add Book
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default AddBook
