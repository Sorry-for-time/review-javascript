function King(params) {
  // 可以通过 new 关键字来检测函数是否使用 new 来调用
  // 如果是直接调用的, 那么 new.target 为 undefined, 如果使用 new 的话那么这个属性指向构造函数本身
  console.log(new.target === King);
  if (!new.target) {
    throw "YOU MUST USE 'new' keyword instantiated!";
  }
  console.log("SUCCESS");
}

new King();
// true
// SUCCESS

try {
  King(); // false
} catch (e) {
  console.warn(e); // YOU MUST USE 'new' keyword instantiated!
}

console.log("-".repeat(30));

/**
 * ECMAScript 中的函数也是对象, 银川也具有属性
 * length: 保存函数定义时的参数
 * prototype: 保存引用类型所有实例方法的地方, 且这个属性不可枚举(使用 for-in 循环部返回这个属性)
 */
console.log(King.length); // 1

console.log("-".repeat(40));

/**
 * apply 和 call 都可以用指定的 this 来调用 函数
 * apply 介绍两个参数: this 值, 参数数组(也可以是 arguments)
 */

function sum(x, y) {
  return x + y;
}

function applySum(num1, num2) {
  return sum.apply(this, arguments);
}

console.log(applySum(12, 12)); // 24

function callSum(num1, num2) {
  // call 和 apply 的区别在在于参数是逐个传递的
  // return sum.call(this, ...arguments); // 这也是OK的
  return sum.call(this, num1, num2);
}

console.log(callSum(11, 11)); // 22

console.log("-".repeat(50));

window.color = "RED";
function sayColor() {
  console.log(this.color);
}
const o = { color: "BLUE" };
// bind 方法可以用于创建新的函数实例, 实例的 this 值会绑定到传给 bind 方法的对象
const func2 = sayColor.bind(o);
func2(); // BLUE
