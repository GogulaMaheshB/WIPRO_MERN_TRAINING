const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const products = [
    { id: 1, name: "Laptop", price: 50000, category: "Electronics" },
    { id: 2, name: "Mobile", price: 25000, category: "Electronics" },
    { id: 3, name: "Chair", price: 3000, category: "Furniture" }
];

app.get("/admin", (req, res) => {
    res.render("admin", {
        products
    });
});

app.get("/test", (req, res) => {
    res.send("Server OK");
});

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
