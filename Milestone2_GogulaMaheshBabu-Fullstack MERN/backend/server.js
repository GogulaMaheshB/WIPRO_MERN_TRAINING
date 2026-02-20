const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

let products = [
    {
        id: 1,
        name: "Smart Water Purifier",
        price: 18000,
        category: "Home Appliances",
        description: "Advanced water purifier with multi-stage filtration system"
    },
    {
        id: 2,
        name: "Chair",
        price: 14500,
        category: "Furniture",
        description: "Comfortable chair designed for long working hours"
    },
    {
        id: 3,
        name: "Wireless Noise Cancelling Headphones",
        price: 22000,
        category: "Audio Devices",
        description: "Over-ear headphones with active noise cancellation technology"
    },
    {
        id: 4,
        name: "Smart Fitness Band",
        price: 6500,
        category: "Wearable Technology",
        description: "Fitness band with heart rate, sleep tracking and step counter"
    },
    {
        id: 5,
        name: "Laptop",
        price: 55000,
        category: "Electronics",
        description: "High performance laptop with 512GB storage"
    },
    {
        id: 6, name: "Automatic Coffee Maker",
        price: 12500,
        category: "Kitchen Appliances",
        description: "Fully automatic coffee maker with multiple brewing options"
    }
];

//which is used to get the all products
app.get("/products", (req, res) => {
    res.json(products);
});

//which is used to get the the product by id
app.get("/products/:id", (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) return res.status(404).json({  message: "Not Found" });
    res.json(product);
});

//which is used to add the product
app.post("/products", (req, res) => {
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

//server running on port 5000
app.listen(5000, () => {
    console.log("Server running on port 5000");
});