import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth.api";
import "../styles/Auth.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Register() {
  const navigate = useNavigate();


  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone number is required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Must contain a lowercase letter")
      .matches(/[A-Z]/, "Must contain an uppercase letter")
      .matches(/[0-9]/, "Must contain a number")
      .matches(/[@$!%*?&]/, "Must contain a special character")
      .required("Password is required")
  });

  return (
  <div className="auth-hero hero-carousel">

    <div className="carousel-bg">
      <img src="/images/bg1.jpg" alt="bg1" />
      <img src="/images/bg2.jpg" alt="bg2" />
      <img src="/images/bg3.jpg" alt="bg3" />
    </div>

    <div className="hero-overlay"></div>

    <div className="auth-card-wrapper">
      <div className="auth-card">
        <h2>Register</h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            password: ""
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              await register(values);
              alert("User Registered Successfully");
              resetForm();
              navigate("/login");
            } catch (error) {
              alert(
                error.response?.data?.message ||
                "Registration Failed"
              );
            }
          }}
        >
          {() => (
            <Form>
              <label>Name</label>
              <Field name="name" placeholder="Enter your Name" />
              <ErrorMessage name="name" component="div" className="error" />

              <label>Email</label>
              <Field name="email" placeholder="Enter your email" />
              <ErrorMessage name="email" component="div" className="error" />

              <label>Phone</label>
              <Field name="phone" placeholder="Enter your phone number" />
              <ErrorMessage name="phone" component="div" className="error" />

              <label>Password</label>
              <Field
                type="password"
                name="password"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="error" />

              <button className="auth-btn" type="submit">
                REGISTER
              </button>
            </Form>
          )}
        </Formik>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>

  </div>
);

}
