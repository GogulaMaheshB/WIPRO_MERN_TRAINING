import { useState } from "react";

function Footer() {
  const [data, setData] = useState({
    name: "",
    mobile: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    let err = {};

    if (!data.name.trim()) err.name = "Name is required";

    if (!/^[0-9]{10}$/.test(data.mobile))
      err.mobile = "Enter 10 digit mobile number";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      err.email = "Enter valid email";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    setSuccess("");

    if (validate()) {
      setSuccess("Thank you! We will contact you soon 😊");
      setData({ name: "", mobile: "", email: "" });
      setErrors({});
    }
  };

  return (
    <footer
      id="contact"
      className="bg-gray-900 text-white mt-16"
    >
      {/* 🔹 TOP FOOTER: INFO + MAP */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* COMPANY INFO */}
        <div>
          <h3 className="text-xl font-bold mb-3">Mahi Biryani</h3>
          <p className="text-gray-300">
            Near RTC Bus Stand,<br />
            Kadiri, Andhra Pradesh – 515591
          </p>
          <p className="mt-3 text-gray-300">
            📞 +91 6302230214 <br />
            📧 info@mahibiryani.com
          </p>
        </div>

        {/* MAP */}
        <div>
          <h3 className="text-xl font-bold mb-3">Our Location</h3>
          <iframe
            className="w-full h-64 rounded"
            src="https://maps.google.com/maps?q=Kadiri,Andhra%20Pradesh&z=13&output=embed"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* 🔹 BOTTOM FOOTER: CONTACT FORM */}
      <div className="border-t border-gray-700">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <h3 className="text-xl font-bold mb-6 text-center">
            Contact Us
          </h3>

          <form
            onSubmit={submit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* NAME */}
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded bg-white text-black placeholder-gray-500"
                value={data.name}
                onChange={(e) =>
                  setData({ ...data, name: e.target.value })
                }
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name}</p>
              )}
            </div>

            {/* MOBILE */}
            <div>
              <input
                type="text"
                placeholder="Mobile Number"
                className="w-full p-3 rounded bg-white text-black placeholder-gray-500"
                value={data.mobile}
                onChange={(e) =>
                  setData({ ...data, mobile: e.target.value })
                }
              />
              {errors.mobile && (
                <p className="text-red-400 text-sm">{errors.mobile}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 rounded bg-white text-black placeholder-gray-500"
                value={data.email}
                onChange={(e) =>
                  setData({ ...data, email: e.target.value })
                }
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email}</p>
              )}
            </div>

            {/* BUTTON */}
            <div className="md:col-span-3 text-center mt-4">
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 px-8 py-3 rounded font-semibold"
              >
                Submit
              </button>
            </div>

            {success && (
              <p className="md:col-span-3 text-center text-green-400 mt-3">
                {success}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-gray-400 text-sm py-4 border-t border-gray-800">
        © 2026 Mahi Biryani | Kadiri
      </div>
    </footer>
  );
}

export default Footer;
