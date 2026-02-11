import express, { json, urlencoded } from "express";
import morgan from "morgan";
import requestLogger from "./middleware/requestLogger.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
// Built -in middleware
app.use(json());  // JSON 
app.use(urlencoded({ extended: true })); // Form data
//custom middleware
app.use(requestLogger);

//Third - party middlewares
app.use(morgan("dev"));

// routes
app.use("/students", studentRoutes);

// 404 Middleware
app.use((req,res)=> {
    res.status(404).json({success :false , message : "Route not found"});
});
//Global Error Handler middleware must be at the end
app.use((err,req,res,next)=> {
    console.error("Error" ,err.message);
    res.status(500).json({success :false , message : "Some internal server error"});
});

app.listen(3000, ()=>{
    console.log("Server is running and started");
})