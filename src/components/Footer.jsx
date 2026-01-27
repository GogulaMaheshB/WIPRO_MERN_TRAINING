

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

      
      {/* ================= COPYRIGHT ================= */}
      <div className="text-center text-gray-400 text-sm py-4 border-t border-gray-800">
        © 2026 Mahi Biryani | Kadiri, Andhra Pradesh
      </div>

    </footer>
  );
}

export default Footer;
