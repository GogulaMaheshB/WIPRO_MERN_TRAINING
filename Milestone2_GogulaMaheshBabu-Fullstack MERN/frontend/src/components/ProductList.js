import React, { Component } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

class ProductList extends Component {
  state = {
    products: [],
    loading: true,
    error: ""
  };

  async componentDidMount() {
    try {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      this.setState({ products: data, loading: false });
    } catch {
      this.setState({ error: "Failed to load", loading: false });
    }
  }

  render() {
    const { products, loading, error } = this.state;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
      <div className="container mt-4">
        <Link to="/add" className="btn btn-success mb-3">
          Add Product
        </Link>

        <div className="row">
          {products.map(product => (
            <div className="col-md-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
