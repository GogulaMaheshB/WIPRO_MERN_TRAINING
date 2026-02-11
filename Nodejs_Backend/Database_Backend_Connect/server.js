import { createRequire } from "module";
const require = createRequire(import.meta.url);
import express, { json, urlencoded } from "express";
const mongoose = require("mongoose")
const Student = require("./models/Student.js");
const app = express();
mongoose.connect("mongodb://localhost:27017/admin")
.then(()=>console.log("Db connected"))
.catch(err => console.error(err));
// Built -in middleware
app.use(json());  // JSON 
app.use(urlencoded({ extended: true })); // Form data
app.use(express.static("publichtml"));


app.post("/students", async(req,res)=>{
try
{
const{name, email} = req.body;
if(!name || !email)
{
return res.status(400).json({success :false , message : "name and email are required"});
}
await Student.create({name ,email});
res.send("Student data is saved successfully");
}
catch(err)
{
    res.status(500).send("Internal server error");
}
});
app.get("/students", async(req,res)=>{
    const students = await Student.find();
    res.json(students);
});
app.listen(3000, ()=>{
    console.log("Server running");
})