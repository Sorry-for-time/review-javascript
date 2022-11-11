/**
 * 一个用于测试的工厂函数
 * @param name 姓名
 * @param job 职业
 * @param age 年龄
 * @returns 创建实例
 */
function createOject(name, job, age) {
  const o = new Object();
  o.name = name;
  o.job = job;
  o.age = age;
  return o;
}

console.log(createOject("Wayne", "SoftWare Engineer", 23));
// {name: 'Wayne', job: 'SoftWare Engineer', age: 23}

console.log("-".repeat(30));

/**
 * es5 构造函数(构造函数通常开头采用大写, 用于区分普通函数)
 * @param {*} name
 * @param {*} job
 * @param {*} age
 */
function Person(name, job, age) {
  this.name = name;
  this.job = job;
  this.age = age;
}

/**
 * 1.内存中创建一个新对象
 * 2.对象内部的 [[Prototype]] 特性被赋值为构造函数的 prototype
 * 3.构造函数内部的 this 被赋值这个新对象(即 this 指向新对象)
 * 4.执行构造函数内部的代码
 * 5.如果构造函数返回非空对象, 则返回该对象, 否则, 返回刚创建的新对象
 */
const person1 = new Person("Fox", "movie maker", 43);
console.log(person1);
// Person {name: 'Fox', job: 'movie maker', age: 43}

console.log(person1.constructor === Person); // true
console.log(person1.__proto__ === Person.prototype); // true

// 构造函数也是函数
console.log(typeof Person); // function
console.log(person1 instanceof Person); // true
console.log(person1 instanceof Object); // true

console.log("-".repeat(30));
function Person2() {}
// 如果不传递参数, 那么构造函数后面的括号可加可不加
const person2 = new Person2();
console.log(person2); // Person2 {}

console.log("-".repeat(30));

function Person3(name) {
  this.specialName = name;
}

/**
 * 任何函数只要使用 new 操作符调用就是构造函数, 反之就是普通函数
 * 如果直接调用(如下), 会被添加到 window 对象上
 * 注: 在调用一个函数而没有指定 this(即没有作为对象的方法调用) 的情况(或者没使用 call()/apply() 调用), this 始终指向 global
 */
// Person3("Wayne"); // 在新版浏览器严格模式下不一定成功运行
// console.log(window.specialName);

// 在另一个对象的作用域中调用
let o = new Object();
// 将对象 o 指定为 person 内部的 this
Person3.call(o, "Bruce Wayne");
console.log(o.specialName); // Bruce Wayne
