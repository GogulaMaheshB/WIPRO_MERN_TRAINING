// const http=require('http');
// const server=http.createServer((req,res)=>{
//     res.writeHead(200,{'content-type':'text/plain'});
//     res.end('welcome to node.js')
// });
// server.listen(3000,()=>{
//     console.log('Server is running at http://localhost:3000');
// })
// const fs = require("fs");

// console.log("Start");

// // Blocking file read
// const data = fs.readFileSync("data.txt", "utf8");

// console.log("File read completed");
// console.log("End");

const fs = require("fs");

console.log("Start");

// Non-blocking file read
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err.message);
    return;
  }

  console.log("File read completed");
  console.log(data);
});

console.log("End");
