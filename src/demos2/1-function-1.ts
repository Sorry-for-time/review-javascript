export {};

console.log(new Function().name); // anonymous
// 通过 Function 创建一个函数体(虽然并不推荐)
const fn: Function = new Function("x", "y", "return x+y;");
console.log(fn(12, 12)); // 24
const fn2 = (): void => {};
// 所有的函数都是 Function 类似的实例
function fn3() {}
console.log(fn instanceof Function); // true
console.log(fn2 instanceof Function); // true
console.log(fn3 instanceof Function); // true
console.log("-".repeat(40));
console.log(fn2.name); // fn2
console.log(fn3.name); // fn3

// 如果使用 bind 实例化, 那么标识符前有一个前缀
console.log(fn2.bind(null).name); // bound fn2
