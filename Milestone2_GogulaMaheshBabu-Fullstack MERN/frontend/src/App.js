import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/add" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
