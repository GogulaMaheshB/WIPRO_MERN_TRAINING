const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 50000 },
  { id: 2, name: 'Chair', category: 'Furniture', price: 3000 },
  { id: 3, name: 'Mobile', category: 'Electronics', price: 20000 },
  {id: 4, name : 'Sofa', category: 'Furniture', price:60000}
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
