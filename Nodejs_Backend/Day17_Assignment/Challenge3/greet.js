
const name = process.argv[2];

if (!name) {
  console.log("Please provide your name");
  return;
}

const now = new Date();

console.log(`Hello, ${name}! Today is ${now}`);
