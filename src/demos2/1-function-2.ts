export {};
// 1.ECMAScript 的函数不关心函数参数的类型以及个数(实际上参数在内部表现为一个数组)

// ts 提供函数签名重载操作(这在 js 中不允许), 主要是为了类型参数提示
// 函数签名重载
/**
 * 开平方操作
 * @param num 底数
 */
function numOperation(num: number): number;
/**
 * 相乘操作
 * @param num1 数1
 * @param num2 数2
 */
function numOperation(num1: number, num2: number): number;
function numOperation(): number {
  // 必须提供一个无参数声明于底部用于声明(语法要求)
  console.log(arguments);
  if (!arguments.length) {
    throw new Error("YOU MUST SEND AT LEAST ONE PARAM");
  }
  if (arguments.length === 1) {
    return Math.pow(arguments[0], 2);
  } else {
    return arguments[0] * arguments[1];
  }
}
console.log(numOperation(3)); // 9
console.log(numOperation(2, 2)); // 4

// tsc 编译结果
// function numOperation() {
//     // 必须提供一个无参数声明于底部用于声明(语法要求)
//     console.log(arguments);
//     if (!arguments.length) {
//         throw new Error("YOU MUST SEND AT LEAST ONE PARAM");
//     }
//     if (arguments.length === 1) {
//         return Math.pow(arguments[0], 2);
//     }
//     else {
//         return arguments[0] * arguments[1];
//     }
// }
// console.log(numOperation(3)); // 9
// console.log(numOperation(2, 2)); // 4
