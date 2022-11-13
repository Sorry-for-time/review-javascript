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

function doAdd(num1?: any, num2?: any) {
  if (arguments.length === 1) {
    return num1;
    // 允许 arguments 对象和命名参数一起使用
  } else if (arguments.length === 2) {
    return arguments[0] + num2;
  }
}

console.log(doAdd(12)); // 12
console.log(doAdd(12, 12)); // 24
console.log("-".repeat(40));

// 非严格模式下才有效(否则并无同步的效果)
function doOther(num1: any): void {
  // arguments 对象的值会自动同步到对应的命名参数
  // 且arguments 对象的长度是根据传入参数的个数
  console.log("num1 origin:", num1);
  arguments[0] = "CHANGE";
  console.log("num1:", num1); // CHANGE
  console.log("arguments[0]:", arguments[0]);
}
doOther("23");

function doAnother(name = "A DEFAULT VALUE"): void {
  console.log(name);
  // 使用默认擦参数时, arguments 对象不会返回参数的默认值, 只反映传给函数的参数
  // es5 严格模式下, 修改命名参数也不会影响 arguments 对象, 始终以调用函数时传人的值为准
  console.log(arguments[0]);
}
doAnother();
// A DEFAULT VALUE
// undefined

// 因为参数是按照顺序进行初始化的, 所以后定义默认值的参数可以引用先定义的参数(反过来不行, 参数的初始化顺序遵循 "暂时性死区" 规则)
// 参数也存在于自己的作用域当中, 且也不允许引用函数体的作用域
function doAnother2(parma1: any, parma2 = parma1): void {
  console.log(parma1, parma2);
}
doAnother2("233"); // 233 233
