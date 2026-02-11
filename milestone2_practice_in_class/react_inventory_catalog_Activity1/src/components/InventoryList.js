import React from 'react';
import InventoryCard from './InventoryCard';

function InventoryList() {
  const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 50000 },
    { id: 2, name: 'Chair', category: 'Furniture', price: 3000 },
    { id: 3, name: 'Mobile', category: 'Electronics', price: 20000 }
  ];

  return (
    <div>
      <h2>Inventory Catalog</h2>

      {products.map((item) => (
        <InventoryCard
          key={item.id}
          name={item.name}
          category={item.category}
          price={item.price}
        />
      ))}
    </div>
  );
}

export default InventoryList;
