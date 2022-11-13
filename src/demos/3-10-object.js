// 寄生式组合继承

function createObject(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function inheritPrototype(subType, superType) {
  let prototype = createObject(superType.prototype); // 创建父类原型的副本
  prototype.constructor = subType; // 解决重写原型导致默认 constructor 丢失的问题
  subType.prototype = prototype; // 重写子类原型
}

function SuperType(name) {
  this.name = name;
  this.colors = ["red", "green", "blue"];
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name); /* 将父类的实例属性传递到子类 */
  this.age = age;
}

// 重写子类原型
inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function () {
  console.log(this.age);
};

const person = new SubType("Fox", 23);
console.log(person); // SubType {name: 'Fox', colors: Array(3), age: 23}
console.log(person.__proto__);
/*
SuperType {constructor: ƒ, sayAge: ƒ}
  constructor: ƒ SubType(name, age)
  sayAge: ƒ ()
  [[Prototype]]: Object
    sayName: ƒ ()
    constructor: ƒ SuperType(name)
  [[Prototype]]: Object
*/

person.sayAge(); // 23
person.sayName(); // Fox

// 因为原型链仍然保持不变, 所以依然可以进行判断
// instanceof 基本判断依据: person.__proto__ === SubType.prototype

// 自定义一个 instanceof 判断函数
function isInstance(object, func) {
  let left = object.__proto__;
  const prototype = func.prototype;
  while (true) {
    if (!left) {
      return false;
    }
    if (left === prototype) {
      return true;
    }
    left = left.__proto__;
  }
}

console.log(person instanceof SubType); // true
console.log(isInstance(person, SubType)); // true
