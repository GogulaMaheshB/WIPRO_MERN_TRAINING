const fs = require("fs").promises;
const logger = require("./logger");
const events = require("./events");

async function router(req, res) {

  // log every request
  logger(req.method + " " + req.url);

  if (req.url === "/health") {
    res.end("Server is healthy");
  }

  else if (req.url === "/login") {
    events.emit("userLogin");
    res.end("Login successful");
  }

  else if (req.url === "/users") {
    try {
      const data = await fs.readFile("users.json", "utf-8");
      events.emit("dataFetched");
      res.end(data);
    } catch (err) {
      res.end("Error reading users");
    }
  }

  else {
    res.end("No proper routing found");
  }
}

module.exports = router;
