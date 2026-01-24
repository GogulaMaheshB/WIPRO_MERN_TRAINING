import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./hoc/ProtectedRoute";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  // ❌ Hide footer on admin page
  const hideFooter = location.pathname.startsWith("/admin");
  const hideCart=location.pathname.startsWith("/cart")

  return (
    <>
      <div className="min-h-screen flex flex-col bg-amber-200">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
         

        </Routes>
         {/* ✅ Footer only for non-admin pages */}
          {!(hideFooter || hideCart) && <Footer />}


      </div>
    </>
  );
}

export default App;
