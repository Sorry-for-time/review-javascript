// 盗用构造函数实现向父类构造器传递参数

function SuperType(name) {
  this.name = name;
}
SuperType.prototype.sayHi = function () {
  console.log("hi");
};
function SubType(name, job) {
  // 将作用域改为 SubType 内部, 即在 SubType 内执行了 this.name=name
  SuperType.call(this, name);
  this.job = job;
}
console.log(new SubType("Bruce", "cooker")); // SubType {name: 'Bruce', job: 'cooker'}
// 报错, 无法访问父类原型上定义的方法, 也是盗用构造函数存在的问题
// new SubType("Wayne", "doctor").sayHi();
console.log("-".repeat(30));

// 组合式继承
function SubType2(name, job) {
  SuperType.call(this, name);
  this.job = job;
}

SubType2.prototype = new SuperType();
const sub2Instance = new SubType2("Matt", "Software Engineer");
console.log(sub2Instance); // SubType2 {name: 'Matt', job: 'Software Engineer'}

// 正常使用父类原型上的方法
sub2Instance.sayHi(); // hi

console.log("-".repeat(30));
// 原型式继承
function createObject(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
const person = {
  name: "Nicholas",
  friends: ["Van", "Black"],
};
const otherPerson = createObject(person);
console.log(otherPerson);
console.log(otherPerson.name); // Nicholas

console.log("-".repeat(30));
console.log(person.friends); // ['Van', 'Black']
const anotherPerson = Object.create(person, {
  name: {
    value: "Greg",
  },
});
console.log(anotherPerson); // {name: 'Greg'}
console.log(anotherPerson.friends); // ['van', 'Black']
anotherPerson.friends.push("Smith");
console.log(anotherPerson.friends); // ['van', 'Black', 'Smith']
// 属性中包含的引用值始终会在相关对象之间共享
console.log(person.friends); // ['van', 'Black', 'Smith']
