// const fs = require("fs");

// function logger(message) {
//   fs.appendFileSync("logs.txt", message + "\n");
// }
const fs = require("fs");

function logger(message) {
  fs.appendFileSync("logs.txt", message + "\n");
}

module.exports = logger;
