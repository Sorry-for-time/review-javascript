export {};

type FAC = (num: number) => number;

let factorial: FAC = function f(num: number): number {
  if (num <= 1) {
    return 1;
  } else {
    return num * f(num - 1);
  }
};

console.log(factorial(3)); // 6
const factorial2: FAC = factorial;
// 因为将函数表达式赋值给 factorial, 即使把函数赋值给另一个变量, 函数表达式的名称 f 也不会变, 所以如下代码依然没问题(引用依然存在, 即 factorial2 指向 了 f)
(<any>factorial) = null;
console.log(factorial2(3)); // 6
