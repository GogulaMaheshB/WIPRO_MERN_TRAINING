// const EventEmitter = require("events");
// const emitter = new EventEmitter();

// emitter.on("userLogin", () => {
//   console.log("Event userLogin");
// });

// emitter.on("dataFetched", () => {
//   console.log("Event dataFetched");
// });

// emitter.emit("userLogin");
// emitter.emit("dataFetched");
const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("userLogin", () => {
  console.log("EVENT: userLogin");
});

emitter.on("dataFetched", () => {
  console.log("EVENT: dataFetched");
});

module.exports = emitter;
