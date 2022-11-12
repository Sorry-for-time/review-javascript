// 通过原型链实现继承
function SuperType() {
  this.property = true;
}
SuperType.prototype.getSuperTypeValue = function () {
  return this.property;
};

function SubType() {
  this.subProperty = false;
}
// 重写 SubType 的原型对象
SubType.prototype = new SuperType();
// 给子类自身的原型属性是添加新的属性, 即 -> 给 SuperType 实例上添加属性(这不会影响到 SuperType.prototype, 因为是一个实例对象)
SubType.prototype.getSubTypeValue = function () {
  return this.subProperty;
};

const instance = new SubType();
console.log(instance); // SubType {subProperty: false}
console.log(instance.getSubTypeValue()); // false
console.log(instance.getSuperTypeValue()); // true

console.log("-".repeat(30));
console.log(instance instanceof SuperType); // true
console.log(instance instanceof SubType); // true
// 因为重写了 SubType 的原型, 所以 SubType 原型属性的 constructor() 与 SuperType 相同
console.log(SubType.prototype.constructor === SubType.prototype.constructor); // true
console.log(instance.__proto__.constructor === SubType.prototype.constructor); // true
// 值得注意的地方
console.log(SubType.prototype.constructor === SubType); // false
console.log(SubType.prototype.constructor === SuperType); // true
console.log("-".repeat(30));
// 判断原型链中是否包含这个原型
console.log(Object.prototype.isPrototypeOf(instance)); // true
console.log(SuperType.prototype.isPrototypeOf(instance)); // true
console.log(SubType.prototype.isPrototypeOf(instance)); // true
