const { add, subtract, multiply, divide } = require("./math");

console.log("=== GitHub Actions Demo App ===");
console.log(`2 + 3 = ${add(2, 3)}`);
console.log(`10 - 4 = ${subtract(10, 4)}`);
console.log(`5 * 6 = ${multiply(5, 6)}`);
console.log(`20 / 4 = ${divide(20, 4)}`);
console.log("App executed successfully!");
