const express = require("express");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  session({
    secret: "admin_secret_key",
    resave: false,
    saveUninitialized: false
  })
);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


const products = [
  { id: 1, name: "Laptop", price: 50000, category: "Electronics" },
  { id: 2, name: "Mobile", price: 25000, category: "Electronics" },
  { id: 3, name: "Chair", price: 3000, category: "Furniture" }
];


const ADMIN = {
  username: "admin",
  password: "1234"
};


function adminAuth(req, res, next) {
  if (req.session.isAdmin) {
    next();
  } else {
    res.redirect("/login");
  }
}


app.get("/login", (req, res) => {
  res.render("login", { error: null });
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN.username && password === ADMIN.password) {
    req.session.isAdmin = true;
    res.redirect("/admin");
  } else {
    res.render("login", { error: "Invalid credentials" });
  }
});


app.get("/admin", adminAuth, (req, res) => {
  res.render("admin", { products });
});


app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
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
