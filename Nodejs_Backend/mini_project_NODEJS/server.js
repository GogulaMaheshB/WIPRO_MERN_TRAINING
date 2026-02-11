const http = require("http");
const fs = require("fs");
const router = require("./router");

const server = http.createServer(async (req, res) => {

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(fs.readFileSync("index.html"));
  }
  else {
    await router(req, res);
  }

});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
