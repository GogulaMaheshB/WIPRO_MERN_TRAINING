import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`http://localhost:5000/products/${id}`);
      const data = await res.json();
      setProduct(data);
    }
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <p>{product.category}</p>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductDetail;
