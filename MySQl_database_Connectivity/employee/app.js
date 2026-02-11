const express =require("express");

require("dotenv").config(); // Load environment variables from .env file

const employeeRoutes = require("./routes/employeeRoutes"); // Import user routes

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/api", employeeRoutes); // Use the user routes for any requests to "/api/user" endpoint



app.use((error,req,res,next) => {
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

