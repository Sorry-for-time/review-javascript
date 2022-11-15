export {};

/**
 * 尾递归优化为 ECMAScript6 新增的内存优化管理机制, 让 js 引擎在满足条件时可以重用栈帧
 * 非常适合于尾调用, 即外部函数的返回值时一个内部函数返回的值
 * 条件: 代码在严格模式下
 * 外部函数的返回值是对尾调用函数的调用
 * 尾调用函数返回后不需要额执行额外逻辑
 * 尾调用不是引用外部函数作用域中自由变量闭包
 */
function fib(n: number): number {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}
const bucket: Array<number> = new Array<number>(41);
const start1: number = Date.now();
for (let i: number = 0; i <= 40; i++) {
  bucket[i] = fib(i);
}
const end1: number = Date.now();
console.log("无尾递归优化: ", end1 - start1); // 2777

// ====================== 尾递归优化版本 ======================
console.log("-".repeat(40));
const start2: number = Date.now();
const bucket2: Array<number> = new Array<number>(41);
function fibImpl(a: number, b: number, n: number): number {
  if (n === 0) {
    return a;
  }
  return fibImpl(b, a + b, n - 1);
}
function fib2(n: number): number {
  return fibImpl(0, 1, n);
}
for (let i: number = 0; i <= 40; i++) {
  bucket2[i] = fib2(i);
}
const end2: number = Date.now();
console.log("有尾递归优化: ", end2 - start2); // 0
