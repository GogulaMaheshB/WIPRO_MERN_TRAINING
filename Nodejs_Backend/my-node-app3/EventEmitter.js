// const EventEmitter = require("events");
// const emitter  = new EventEmitter();

// emitter.on("OrderPlaced",()=>{
//     console.log(``)
// })
const EventEmitter = require("events");
const emitter = new EventEmitter();
//Listener
emitter.on("Order Placed" , (orderId)=>{
    console.log(`Order ${orderId} processed`)
});
// emitter.on("Order Placed" , (orderId)=>{
//     console.log(`Email sent for order ${orderId}`)
// });
// emitter.on("Order Placed" , (orderId)=>{
//     console.log(`Inventory updated for order ${orderId}`)
// });


// Emit event
emitter.emit("Order Placed" , 101);

/*
Multiple listeners
emitter.on("order placed" ,() => console.log("Email Sent"));
emitter.on("order placed" ,() => console.log("Inventory Updated"));
emitter.on("order placed" ,() => console.log("Logs Created for Auditing"));
*/