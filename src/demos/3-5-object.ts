export {};

function Person(): void {}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.sayName = function () {
  console.log("the name is: ", this.name);
};

Object.defineProperty(Person.prototype, "job", {
  enumerable: false,
  value: "Software Engineer",
});

// keys(o) 方法会返回可以获得对象上可以被枚举的属性
const keys: Array<string> = Object.keys(Person.prototype);
console.log(keys); // ['name', 'age', 'sayName' ]
const aPerson: any = new (Person as ObjectConstructor)();
console.log(aPerson); // Person {}
aPerson.sayName(); // the name is Nicholas

console.log("-".repeat(30));
aPerson.tag = "A TAG";
// for-in 下可以通过对象访问且可以被枚举的属性都会返回
// 注: for-in 和 keys() 循环的枚举顺序是不确定的, 行为取决于 js 引擎
for (let i in aPerson) {
  console.log(i);
}
// tag
// name
// age
// sayName

console.log("~".repeat(30));
for (let k in aPerson.__proto__) {
  console.log(k);
}
// name
// age
// sayName

console.log("-".repeat(30));
console.log(Object.keys(aPerson)); // ['tag']
aPerson.name = "Fox";
console.log(Object.keys(aPerson)); // ['tag', 'name]

console.log("=".repeat(30));

// 获取对象上所有可枚举和不可枚举的属性
// getOwnPropertyNames(), assign() 的枚举顺为有序的
console.log(Object.getOwnPropertyNames(Person.prototype));
// ['constructor', 'name', 'age', 'sayName', 'job']
