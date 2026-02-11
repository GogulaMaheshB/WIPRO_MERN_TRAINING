const express = require('express');
        const app = express();

// const {body, validationResult} = require("express-validator")
//          app.use(express.json()); 

let products =[{id:1, name:"laptop"
    // ,email:"abc@gmail.com"
}];
         //rest endpoint / api
           app.get("/health"  ,(req,res)=>{
            // its giving the json response and it is stateless
            res.json({status:"UP"});
        });

         app.post("/postproduct"  ,(req,res)=>{
            products.push(req.body);
            res.status (201).send("Product inserted");
        })
        app.get("/getproduct", (req,res)=>{

            res.json(products);
        })
        app.put("/product/:id" , (req,res)=>{

         const products =  products.find(p=> p.id == req.params.id)
              products.name =  req.body.name;
            res.send("Product  updated");
        })

           app.delete("/product/:id" , (req,res)=>{
           const id =  req.params.id;
           console.log(id);
          products =  products.filter(p=> p &&  p.id != id)
             
            res.send("Product  deleted");
        })

// app.post("/postproduct" , body("email").isEmail() ,(req,res)=>{
//     const errors  = validationResult(req);
//     if(!errors.isEmpty())
//     {return res.status(400).json(errors.array());
//     }
//         else
//         {
//             products.push(req.body);
//             res.status (201).send("Product inserted");
//     }
//         })

//         app.use((err,req,res,next)=>{
//                 res.status(500).json({message: "Internal server error"})
//         })

        // fetch("http://localhost:3000/products")
        // .then(res=>res.json())
        // .then(data=>console.log(data));

        app.listen(3000);
        console.log("app started");