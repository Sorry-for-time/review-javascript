export {};

// JS 下的对象属性
let person = {
  name: "Nicholas",
  gender: "male",
  age: 23,
};

console.log(person);

Object.defineProperty(person, "name", {
  configurable: true /* 设置为允许被 delete 关键词删除, 默认: true */,
  writable: false /* 设置属性不允许被修改 */,
  value: "Nicholas2",
  enumerable: false /* 设置为不可枚举(即不能通过 for in 循环遍历) */,
});

console.log(person);

// person.name = "Wayne"; // 报错, 因为属性设置了不可修改
delete (person as any).name; // 删除内部的 name 属性
console.log(person);

console.log("-".repeat(30));

for (let item in person as any) {
  console.log(item); // 不会出现 name 属性, 因为设置为了不可枚举
}

console.log("-".repeat(30));
let person2 = {
  name: "Fox",
};

console.log(person2);
Object.defineProperty(person2, "name", {
  configurable: false, // 如果进行设置为 false 后就不允许再次进行修改
});

// 报错
/* Object.defineProperty(person2, "name", {
  configurable: true,
}); */

console.log("-".repeat(30));

let person3 = {
  _name: "Wayne",
  age: 12,
};
Object.defineProperty(person3, "name", {
  get(): any {
    console.log("trigger get method");

    return this._name;
  },
  set(value: any): void {
    console.log(`%ctrigger origin value: ${this._name} to newValue: ${value}`, "background: orange; color: cyan");
    this._name = value;
  },
});

console.log(person3);
(<any>person3).name = "Nicholas";
console.log((person3 as any).name);

console.log("-".repeat(30));

const person4 = {};
console.log(person4);
Object.defineProperties(person4, {
  name: {
    value: "Wayne",
    configurable: true,
    enumerable: true,
  },
  age: {
    value: 23,
    enumerable: true,
  },
  gender: {
    value: "male",
    // 不进行定义的话, enumerable 默认为 false
  },
});

console.log(person4);
for (const v in person4) {
  console.log(v);
}
console.log(Object.getOwnPropertyDescriptors(person4));
// {name: {…}, age: {…}, gender: {…}}

console.log("-".repeat(30));
let result = {};

// assign 方法会覆盖重复的属性, 所以 age 为最新的 23
// 且 object 执行的是浅复制操作
Object.assign(result, person3, person4);
console.log(result);

console.log((result as any).name);

console.log("-".repeat(30));

let dest2 = {};
let src = {
  a: "foo",
  // 调用 assign 执行到这里会出错
  get b() {
    throw new Error("throw a error");
  },
};

try {
  Object.assign(dest2, src); // error
} catch (e) {}
console.log(dest2); // {a: 'foo'}

// 判断方法
console.log("-".repeat(30));

// 以前判断 Nan 的方法
console.log(isNaN(NaN)); // true

// ES6 新增判断方法
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(0, false)); // false

console.log("-".repeat(30));

let nameKey = "name";
let ageKey = "age";
let nothingKey = "nothing";
function getRandomKey(str: string) {
  return str + Math.floor(Math.random() * 100);
}
const person5 = {
  // 使用中括号包围对象的属性键可以告诉运行时将其视为 js 表达式而是字符串来求值
  [nameKey]: "Fox",
  [ageKey]: 32,
  nothingKey: "oh not",
  // 动态设置 key
  [getRandomKey("fox")]: "here we are",
};

console.log(person5); // {name: 'Fox', age: 32, nothingKey: 'oh not', fox75: 'here we are'}
