import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
        <hr/>
      <h3>{product.name}</h3>
      <hr/>
      <p>Category: {product.category}</p>
      <hr/>
      <p>Price: ₹{product.price}</p>
      <hr/>

      <Link to="/">Home</Link>
    </div>
  );
}

export default ProductDetail;
