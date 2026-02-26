const fs = require("fs");
// ========== Node.js built-in globals & process info ==========

// 1. Simple message to confirm the script is running (Hindi: "Backend started")
console.log("Backend shuru 🔥");

// 2. __dirname — Absolute path of the directory containing this file
//    Example: C:\Ai-Enabled-FullStack\ai-learning-journey\node
//    Useful for resolving paths to files/folders relative to this script
console.log(__dirname);

// 3. __filename — Absolute path of this file itself (including filename)
//    Example: C:\Ai-Enabled-FullStack\ai-learning-journey\node\app.js
//    Useful when you need to reference the current file’s location
console.log(__filename);

// 4. process.pid — Process ID (number) assigned by the OS to this Node process
//    Example: 12345
//    Useful for debugging, logging, or killing this process from outside (e.g. task manager)
console.log("processval",process.pid);


console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

console.log("End");

console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

process.nextTick(() => {
  console.log("NextTick");
});

console.log("End");

// Event loop: MICROTASKS (run after current JS, before next phase)
//   - process.nextTick  (highest — runs first)
//   - Promise (.then / .catch / .finally)
//
// Event loop PHASES (in order, per iteration):
//   1. timers       — setTimeout, setInterval
//   2. pending      — deferred I/O callbacks
//   3. idle/prepare — internal
//   4. poll         — I/O, wait for new events
//   5. check        — setImmediate()
//   6. close        — e.g. socket.on('close')
//
// So in your example: sync → NextTick → Promise → Timeout (timers phase)


console.log("Start");

const data = fs.readFileSync("test.txt", "utf8");
console.log(data);

console.log("End");



console.log("Start");

fs.readFile("test.txt", "utf8", (err, data) => {
  console.log(data);
});

console.log("End");