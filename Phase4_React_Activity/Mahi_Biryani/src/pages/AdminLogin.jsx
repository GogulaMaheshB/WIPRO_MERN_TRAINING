import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import AuthStore from "../stores/authStore";

function AdminLogin() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ user: "", pass: "" }}
      validationSchema={Yup.object({
        user: Yup.string().required(),
        pass: Yup.string().required(),
      })}
      onSubmit={(v) => {
        const ok = AuthStore.login(v.user, v.pass);
        if (ok) {
          navigate("/admin", { replace: true });
        } else {
          alert("Invalid credentials");
        }
      }}
    >
      <Form className="max-w-sm mx-auto mt-20 bg-white p-6 rounded">
        <Field name="user" placeholder="Username" className="input mb-3" />
        <Field name="pass" type="password" placeholder="Password" className="input mb-3" />
        <button className="bg-orange-600 w-full text-white py-2 rounded">
          Login
        </button>
      </Form>
    </Formik>
  );
}

export default AdminLogin;
