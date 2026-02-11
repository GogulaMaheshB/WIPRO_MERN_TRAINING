import { useContext } from 'react';
import { ProductContext } from './ProductContext';

function ProductList() {
  const { products } = useContext(ProductContext);

  return (
    <div>
      <h2>Product List</h2>

      {products.map(p => (
        <div key={p.id}>
            <hr/>
          {p.name} <br/><br/> {p.category} <br/> ₹{p.price}
          <hr/>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
