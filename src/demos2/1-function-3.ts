export {};

function factorial(num: number): number {
  if (num <= 1) {
    return 1;
  } else {
    /**
     * 可与使用 callee 对象代替函数名称, 这个属性指向了 arguments 属性所在函数的指针
     * 这在严格模式下可能不适用
     */
    // return num * arguments.callee(num - 1);
    return num * factorial(num - 1);
  }
}

console.log(factorial(3)); // 6

console.log("-".repeat(20));
