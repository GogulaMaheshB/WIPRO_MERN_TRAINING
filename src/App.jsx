import { Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useRef } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartPopup from "./components/CartPopup";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Contact from "./pages/Contact";
import ProtectedRoute from "./hoc/ProtectedRoute";

function App() {
  const location = useLocation();
  const nodeRef = useRef(null);

  const hideFooter =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/cart") ||
    location.pathname.startsWith("/contact");

  return (
    <div className="min-h-screen flex flex-col bg-amber-200 relative overflow-hidden">
      <Navbar />
      <CartPopup />

      {/* ROUTE TRANSITION */}
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.pathname}
          classNames="swipe"
          timeout={100}
          nodeRef={nodeRef}
          unmountOnExit
        >
          <div ref={nodeRef} className="page">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
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
          </div>
        </CSSTransition>
      </TransitionGroup>

      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
