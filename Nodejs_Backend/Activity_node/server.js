const http = require("http");
const users =[{id:1,name:"Niti"},{id:2,name:"sakshi"}]
const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.writeHead("Server is healthy");
    console.log("Server is healthy");
  } 
  else if (req.url === "/time"){
     res.writeHead(200, { "Content-Type": "text/plain" });
     res.end(new Date().toString());
  }
   else if (req.url === "/users"){
     res.writeHead(200, { "Content-Type": "application/json" });
     res.end(JSON.stringify(users));
  }
  else{
    res.writeHead(404)
    res.end("No proper routing found");
  }
});
server.listen(3000);


// const http = require("http");
// const fs = require("fs");
// const querystring = require("querystring");

// //  Employee data stored in server.js
// const employees = {
//   Mahesh: { password: "mahesh123", salary: 50000 },
//   Ramesh: { password: "ramesh123", salary: 45000 }
// };

// const server = http.createServer((req, res) => {

//   // Serve login page
//   if (req.method === "GET" && req.url === "/") {
//     fs.readFile("login.html", (err, data) => {
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(data);
//     });
//   }

//   // Handle login
//   if (req.method === "POST" && req.url === "/login") {
//     let body = "";

//     req.on("data", c=> {
//       body += c.toString();
//     });

//     req.on("end", () => {
//       const { username, password } = querystring.parse(body);

//       //  Check if user exists & password matches
//       if (employees[username] && employees[username].password === password) {

//         const salary = employees[username].salary;
//         const logData = `Employee: ${username}, Salary: ${salary}, Login Time: ${new Date().toLocaleString()}\n`;

//         //  Save log ONLY if password is correct
//         fs.appendFile("employee-log.txt", logData, () => {
//           res.writeHead(200, { "Content-Type": "text/html" });
//           res.end(`<h3>Login Successful</h3>
//                    <p>${logData}</p>`);
//         });

//       } else {
//         //  Wrong password
//         res.writeHead(401, { "Content-Type": "text/html" });
//         res.end("<h3>Invalid Username or Password</h3>");
//       }
//     });
//   }
// });

// server.listen(3000, () => {
//   console.log("Server running at http://localhost:3000");
// });
