
const express = require("express");

const controller =require("../controllers/orderController"); // Import the user controller to ensure it's 
const { validateOrder } = require("../middleware/validateOrder");

//is used to create a new router instance, which will handle the routes related to users.
const router = express.Router();

 // Define a route for GET requests to "/users" that will invoke the getAllUsers function from the user controller.("URL Mapping Handler")
router.post("/order",validateOrder, controller.placeOrder);

module.exports = router; // Export the router instance so it can be used in other parts of the application, such as the main server file (app.js).

