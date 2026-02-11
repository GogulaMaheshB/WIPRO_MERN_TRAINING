import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <div>
      <Link to="/">Products</Link> | <Link to="/add">Add Product</Link>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<AddProduct />} />
      </Routes>
    </div>
  );
}

export default App;
