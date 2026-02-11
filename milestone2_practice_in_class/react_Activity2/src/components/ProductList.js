import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Product List</h2>

      {products.map(p => (
        <div key={p.id}>
            <hr/>
          <Link to={`/product/${p.id}`}>
            {p.name}
          </Link>
          <hr/>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
