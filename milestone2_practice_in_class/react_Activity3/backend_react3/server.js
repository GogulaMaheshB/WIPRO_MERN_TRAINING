const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 50000 },
  { id: 2, name: 'Chair', category: 'Furniture', price: 3000 },
  { id: 3, name: 'Mobile', category: 'Electronics', price: 20000 },
  {id: 4, name : 'Sofa', category: 'Furniture', price:60000}
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/products', (req, res) => {
  const newProduct = {
    id: Date.now(),
    ...req.body
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
