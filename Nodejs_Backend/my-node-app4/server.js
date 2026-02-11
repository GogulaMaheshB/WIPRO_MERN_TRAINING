const express = require("express");
// earlier for parsing we were writing below code:
//         /*const bodyParser = require("body-parser")
//         app.use(bodyParser.json());
//          */ 
const morgan = require("morgan");
const path = require("path");
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// auth middleware
function auth(req, res, next) {
    const isLoggedIn = false;
    if (!isLoggedIn) {
        return res.status(401).send("Unauthorized");
    }
    next();
}

// routes
app.get("/", (req, res) => {
    res.render("home", {
        user: "Niti Dwivedi",
        role: "Admin",
        kpas: ["Coding", "Testing"]
    });
});

app.get("/user", (req, res) => {
    res.send("User fetched");
});

app.post("/userpost", auth, (req, res) => {
    res.send("User data posted");
});

app.put("/userput", auth, (req, res) => {
    res.send("User updated");
});

app.delete("/userdelete", auth, (req, res) => {
    res.send("User deleted");
});

app.get("/error", (req, res) => {
    throw new Error("Something went wrong!");
});

// error handler (ALWAYS LAST)
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
});

app.listen(3000, () => {
    console.log("Server running");
});
// const express = require('express');
//         const app = express();


//         const morgan = require("morgan");
//         app.use(morgan("dev"))
//         // earlier for parsing we were writing below code:
//         /*const bodyParser = require("body-parser")
//         app.use(bodyParser.json());
//          */ 
//         app.use(express.json()); // built in middleware that parses JSON Body from  post & Put 

//         app.set("view engine" ,"ejs");

//         function auth(req,res,next){

//             const isLoggedIn = false;
//             if(!isLoggedIn)
//             {
//                 return res.status(401).send("unauthorized")
//         }
//         next();
//     }

    

//         //custom middleware
//         app.use((err,req,res,next)=>{
//             console.log("Middleware :" , req.method, req.url)
//             console.log(err.message)
//             res.status(500).send("internal server error")
//             next(); //it is used to pass the control to route
//         })

      
//         //Routes
//         //http://localhost:3000/user
        
//         app.get("/error",(req,res)=>{
//             throw new Error("Something went wrong!");
//         })

//         app.get("/"  ,(req,res)=>{

//             res.render("home",{user : "Niti Dwivedi", role:"Admin",kpas:["Coding","Testing"]});
//         })

//         app.get("/user"  ,(req,res)=>{

//             res.send("User fetched");
//         })
//         app.post("/userpost" ,auth , (req,res)=>{

//             res.send("User data posted ");
//         })
//         app.put("/userput" , auth, (req,res)=>{

//             res.send("User updated");
//         })

//         app.delete("/userdelete" ,auth,  (req,res)=>{

//             res.send("User deleted");
//         })

//         app.listen(3000,()=>{
//             console.log("Server running")
//         })
        
        
