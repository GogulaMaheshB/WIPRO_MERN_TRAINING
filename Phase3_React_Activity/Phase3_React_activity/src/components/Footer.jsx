import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid 10 digit mobile number")
    .required("Mobile number is required"),
  email: Yup.string()
    .email("Enter valid email")
    .required("Email is required"),
});

function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white mt-16">

      {/* ================= TOP SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* COMPANY DETAILS */}
        <div id="about">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">
            Mahi Biryani
          </h2>

          <p className="text-gray-300 leading-relaxed">
            Mahi Biryani is known for authentic, hot, and delicious biryani
            prepared using traditional recipes and fresh ingredients.
          </p>

          <div className="mt-4 text-gray-300 space-y-1">
            <p>📍 Near RTC Bus Stand</p>
            <p>Kadiri, Andhra Pradesh – 515591</p>
            <p>📞 +91 6302230214</p>
            <p>📧 support@mahibiryani.com</p>
          </div>
        </div>

        {/* GOOGLE MAP */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-orange-400">
            Our Location
          </h2>

          <iframe
            className="w-full h-64 rounded-lg border-0"
            src="https://maps.google.com/maps?q=Kadiri,Andhra%20Pradesh&z=13&output=embed"
            loading="lazy"
            title="Mahi Biryani Location"
          ></iframe>
        </div>
      </div>

      {/* ================= CONTACT FORM ================= */}
      <div className="border-t border-gray-700 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-3xl mx-auto px-6 py-14">

          <h2 className="
            text-3xl font-extrabold text-center
            text-orange-400 mb-10 tracking-wide
            after:block after:w-24 after:h-1
            after:bg-orange-500 after:mx-auto after:mt-3 after:rounded-full
          ">
            Contact Us
          </h2>

          {/* LIGHT FORM CARD */}
          <div className="bg-white rounded-2xl shadow-xl p-8">

            <Formik
              initialValues={{ name: "", mobile: "", email: "" }}
              validationSchema={ContactSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                alert("Thank you! We will contact you soon 😊");
                resetForm();
              }}
            >
              <Form className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* NAME */}
                <div>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    className="
                      w-full p-3 rounded-lg
                      border border-gray-300
                      text-gray-800 placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-orange-400
                    "
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* MOBILE */}
                <div>
                  <Field
                    name="mobile"
                    type="text"
                    placeholder="Mobile Number"
                    className="
                      w-full p-3 rounded-lg
                      border border-gray-300
                      text-gray-800 placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-orange-400
                    "
                  />
                  <ErrorMessage
                    name="mobile"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="
                      w-full p-3 rounded-lg
                      border border-gray-300
                      text-gray-800 placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-orange-400
                    "
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* BUTTON */}
                <div className="md:col-span-3 text-center mt-6">
                  <button
                    type="submit"
                    className="
                      bg-orange-600 hover:bg-orange-700
                      text-white font-semibold
                      px-10 py-3 rounded-lg
                      transition transform hover:scale-105
                    "
                  >
                    Submit
                  </button>
                </div>

              </Form>
            </Formik>
          </div>
        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="text-center text-gray-400 text-sm py-4 border-t border-gray-800">
        © 2026 Mahi Biryani | Kadiri, Andhra Pradesh
      </div>

    </footer>
  );
}

export default Footer;
