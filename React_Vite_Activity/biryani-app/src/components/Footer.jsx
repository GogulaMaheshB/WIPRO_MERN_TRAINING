function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-10">
      <div className="grid md:grid-cols-2 gap-6">

        {/* Address */}
        <div>
          <h3 className="font-bold mb-2">Mahi Biryani Office</h3>
          <p>Kadiri, Andhra Pradesh, India</p>
          <p>Email: support@mahibiryani.com</p>
          <p>Phone: +91 6302230214</p>
        </div>

        {/* Map */}
        <iframe
  className="w-full h-40 rounded"
  src="https://maps.google.com/maps?q=Kadiri,Andhra%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
  loading="lazy"
></iframe>


      </div>

      <p className="text-center mt-4 text-gray-400">
        © 2026 Mahi Biryani
      </p>
    </footer>
  );
}

export default Footer;
