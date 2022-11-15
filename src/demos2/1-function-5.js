function outer() {
  inner();
}

function inner() {
  // caller 这个属性引用的是调用当前函数的函数
  // console.log(inner.caller);
  console.log(arguments.callee.caller); // 这样子也一样
  console.log(arguments.callee.caller === outer); // true
  // 在严格模式下禁用访问 callee, caller 这些属性
  // 且禁止给 caller 属性赋值
}

outer();
/*
显示了 outer 函数的源码
f outer() {
  inner();
}
*/

console.log("-".repeat(40));
function testCaller(params) {
  console.log(arguments.caller);
  console.log(arguments.callee); // callee 即指向函数自身的一个引用
  console.log(arguments);
}
testCaller("foo");
// undefined
/*
ƒ testCaller(params) {
  console.log(arguments.caller);
  console.log(arguments.callee);
}
*/
