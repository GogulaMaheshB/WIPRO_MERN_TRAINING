import { useState } from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const [favorite, setFavorite] = useState(false);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5>{product.name}</h5>
        <p>{product.price}</p>
        <p>{product.category}</p>

        <button
          className="btn btn-info me-2"
          onClick={() => setFavorite(!favorite)}
        >
          {favorite ? "Favorite" : "Add Favorite"}
        </button>

        <Link to={`/products/${product.id}`} className="btn btn-primary">
          View
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
