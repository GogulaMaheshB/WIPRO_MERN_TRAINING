import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const nav = useNavigate();

  return (
    <Formik
      initialValues={{ user: "", pass: "" }}
      validationSchema={Yup.object({
        user: Yup.string().required(),
        pass: Yup.string().required(),
      })}
      onSubmit={(v) => {
        if (v.user === "admin" && v.pass === "admin123") {
          localStorage.setItem("admin", "true");
          nav("/admin");
        }
      }}
    >
      <Form className="max-w-sm mx-auto mt-20 bg-white p-6 rounded">
        <Field name="user" placeholder="Username" className="input" />
        <Field name="pass" type="password" placeholder="Password" className="input mt-3" />
        <button className="bg-orange-600 w-full text-white mt-4 py-2 rounded">
          Login
        </button>
      </Form>
    </Formik>
  );
}

export default AdminLogin;
