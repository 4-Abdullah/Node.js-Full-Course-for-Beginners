// how NodeJS differs from Vanilla JS
// 1) Runs on a server - not on a browser (back-end not frontend)
// 2) console is the terminal window
// console.log("Abdullah")

// 3) global object instead of window object
// 4) don't need to put js extension while running
// console.log(global)

// 5) Types of Modules: Core Modules (Built-in Modules) and CommonJS Modules (Custom/User-defined Modules)
// 6) Node.js supports two module systems:
//      1) CommonJS (CJS) → Default in Node.js
//         - Uses require() for importing
//         - Uses module.exports for exporting
//         - Loads modules synchronously
//         - Works only in Node.js, not in browsers
//      2) ES Modules (ESM) → Modern JavaScript
//         - Uses import & export
//         - Loads modules asynchronously
//         - Works in both Node.js & browsers
//         - Requires "type": "module" in package.json or .mjs file extension
// 7) require is used to import modules in nodeJS  
// const os = require('os')
const path = require('path')
const math = require('./math')
const {add, subtract, multiply, divide} = require('./math')
// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())
// console.log(os.hostname())

// console.log(__dirname)
// console.log(__filename)

// console.log(path.dirname(__filename))
// console.log(path.basename(__filename))
// console.log(path.extname(__filename))

// console.log(path.parse(__filename))

console.log(math.add(2, 3))
console.log(math.subtract(3,6))
console.log(math.multiply(3,6))
console.log(math.divide(3,6))
console.log(add(2, 3))
console.log(subtract(2, 3))
console.log(multiply(2, 3))
console.log(divide(2, 3))

