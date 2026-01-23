import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Admin from "./pages/Admin";


function App() {
  return (
    <>
    <div className="min-h-screen flex flex-col bg-amber-200">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
      </div>
    </>
  );
}

export default App;
