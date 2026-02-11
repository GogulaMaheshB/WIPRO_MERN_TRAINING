Part-1
Form submission : can be done via
Get -- Query String
Post -- Request body(Commonly used)
<form action="/register" method ="Post">
<input type="text" name ="username">
<input type="text" name ="password">
<button type="submit" >Register</button>
 </form>
 
Browser sends data to the server and the url is /register
 
 
Part-2 -- Built -in body parsing in express.js
Console.log(req.body);   // error as undefined
 
So we use middleware to accept json data and form data
 
// Built -in middleware
app.use(json());  // JSON
app.use(urlencoded({ extended: true })); // Form data
 
It replaces body-parser package
 
So to handle the form submission in routing
 
app.post("/register" , (req,res)=>{
Console.log(req.body);
Res.send("Form received")
 
})
 
 
2nd Step:  Validation
 
 
app.post("/register" , (req,res)=>{
const{username, password} = req.body;
if(!username|| !password)
{
return res.status(400).json({success :false , message : "name and email are required"});
}
res.send("Registration successfully done");
};
 
 
3rd Step : Database interaction
 
We required DB middleware
It will :
Validate the data
Connects to the db
Handle errors
 
Install the library
npm install mongodb
 
Db connection middleware ( Mongoose)
Mongoose is an object Data modelling(ODM) library for MongoDB , commonly
Used with express.js framework to provide structured, schema-based solution
For interacting with the database from node.js application
Const mongoose = require("mongoose");
 
Mongoose.connect("mongodb://localhost:27017/databasename")
.then(()=>console.log("Db connected"))
 
  3 . User Schema
 
 const UserSchema = new mongoose.schema({
    username : String,
Password:String,
     role:String
});
 
Const user = mongoose.model("User", UserSchema);