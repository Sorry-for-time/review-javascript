// 原型模式

/**
 * 默认情况下, 只要创建了一个函数, 就会为该函数创建一个 prototype 属性(指向原型对象)
 * 默认情况下所有原型对象自动获得一个 constructor 属性, 指回与之关联的构造函数
 */

function Person() {}
// constructor 属性指回与之关联的构造函数
console.log(Person.prototype.constructor === Person); // true
const aPerson = new Person.prototype.constructor();
console.log(aPerson); // Person {}
console.log(aPerson.__proto__ === Person.prototype); // true
console.log(aPerson.__proto__.constructor === Person); // true
// 正常的原型都终止于 Object 原型对象
console.log(aPerson.__proto__.__proto__ === Object.prototype); // true
const secondPerson = new Person();
console.log(secondPerson); // Person
console.log(secondPerson.__proto__ == aPerson.__proto__); // true
// Object 原型的原型是 null
console.log(Object.prototype.__proto__); // null

console.log(Person.prototype.__proto__);
/* {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
constructor
:
ƒ Object()
hasOwnProperty
:
ƒ hasOwnProperty()
isPrototypeOf
:
ƒ isPrototypeOf()
... */

console.log("-".repeat(30));
// 获取一个对象的 [[Prototype]](即: __proto__)
console.log(Object.getPrototypeOf(aPerson)); // {constructor}
console.log(Person.prototype); // {constructor}
console.log(Object.getPrototypeOf(aPerson) === Person.prototype); // true
console.log(Object.getPrototypeOf(aPerson).constructor === Person); // true

console.log("-".repeat(30));
const foo = {
  numLength: 2,
};
const bar = {
  name: "Matt",
};
// 重写一个对象的原型
Object.setPrototypeOf(bar, foo);
console.log(bar); // {name: 'Matt}
console.log(bar.numLength); // 2
console.log(bar.__proto__ === foo); // true

console.log("-".repeat(30));

// 通过 create 方法创建一个对象并为其指定原型对象
const aObj = Object.create(bar);
console.log(aObj); // {}
/**
 * 通过对象访问属性时, 如果在这个实例上发现了给的的名称,
 * 那么就返回该名称的值, 如果没有找到, 那么就沿着指针进入原型对象, 然后返回对应的值
 */
console.log("flag: ", aObj.name); // flag Matt
aObj.age = 27;
console.log(aObj); // {age: 27}
console.log(aObj.__proto__); // {name: 'Matt}
console.log(aObj.__proto__ == bar); // true
/**
 * 如果在实例上添加一个与原型对象中同名的属性, 那就在这个实例上创建这个属性,
 * 这个属性回遮住原型对象上的属性, 但不会进行覆写
 */
aObj.name = "Wayne";
console.log(aObj); // {age: 27, name: 'Wayne'}
console.log(aObj.__proto__.name); // Matt
console.log(aObj.__proto__.__proto__.__proto__.constructor); // Object(){ [native code] }

console.log("-".repeat(30));

function Person2() {}
Person2.prototype.specialName = "specialName";
const otherPerson = new Person2();
console.log(otherPerson); // Person2{}
// 用于判断属性来自实例自身, 还是来自原型对象, 如果为原型对象或者不存在, 返回 false
// 如果来自实例, 返回 true
console.log(otherPerson.hasOwnProperty("specialName")); // false
otherPerson.specialName = "A RANDOM VALUE";
console.log(otherPerson.hasOwnProperty("specialName")); // true
console.log(otherPerson.hasOwnProperty("notExists")); // false
console.log(otherPerson.__proto__.hasOwnProperty("specialName")); // true

console.log("-".repeat(30));
// 只要在属性存在对象上, 不论是存在实例自身, 还是在原型上, 都返回 true
Person2.prototype.gender = "male";
console.log("gender" in otherPerson); // true
// hasOwnProperty() 只有属性存在实例上时菜返回 true
console.log(otherPerson.hasOwnProperty("gender")); // false
