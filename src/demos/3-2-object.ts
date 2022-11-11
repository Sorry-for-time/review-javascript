export {};
// es6 给函数添加对象时可以使用更加简便的写法

const objKey: string = "saySomething";

const person = {
  name: "Wayne",
  age: 23,
  // 简写方法于计算属性键可以互相兼容
  [objKey](): void {
    console.log(this.name);
  },
  sayAge(): void {
    console.log(`age is: ${this.age}`);
  },
};

(<any>person)[objKey]();
person.sayAge();

console.log("-".repeat(30));
// 使用对象解构快速将对象的指定值赋予变量
const { name: personName, age: personAge } = person;
console.log(personName, personAge);

// 或者直接通过其键名取得也可以(属性名相同情况下的简写语法)
const { name, age } = person;
console.log(name, age); // Wayne 23

// 对象结构允许设置默认值, 如果引用属性不村子于源对象中, 那么就使用默认定义好的值
const { gender = "male" } = person;
console.log(gender); // male
console.log("-".repeat(30));

// 解构在内部使用函数 ToObject(不能在运行时中直接访问), 把源数据转化为对象, 这意味着在对象解构上下文中, 原始值会被当成对象, 意味着 null 和 undefined 不能被解构
let { constructor: c } = 2;
console.log(c); // Number() { [native code] }
console.log(c === Number); // true
console.log("-".repeat(30));

const origin = {
  job: {
    name: "Front develop",
  },
};

const person2 = {};
// 嵌套解构, 需要加上 (), 可以方便复制对象属性
({ job: (<any>person2).job } = origin);
console.log(person2); // {job:{name: 'Front develop'}}
// 由于是引用赋值, 所以源对象的修改也会反应到解构赋值对象上
origin.job.name = "Full stack develop";
console.log(person2); // {job:{name: 'Full stack develop'}}
console.log("-".repeat(30));

// 解构赋值允许使用嵌套结构
const {
  job: { name: newName },
} = origin;
console.log(newName); // Full stack develop

// 注: 外层属性没有定义的情况雄安不能使用嵌套解构, 无论源对象还是目标对象

const person3: any = {
  job: {
    title: "full stack develop",
  },
};

const copyPerson3: any = {};

// 报错, foo 在源对象上是 undefined
/* ({
  foo: { bar: copyPerson3.bar },
} = person3); */

// 报错, job 在目标对象上是 undefined
/* ({
  job: { title: copyPerson3.job.title },
} = person3); */

console.log("-".repeat(30));

// 函数参数列表中也可以进行解构赋值
const person4 = {
  name: "Matt",
  age: 27,
};

// 对参数的解构赋值不会影响到 arguments
function printingPerson(
  foo: any,
  // 使用和源对象一样的属性名
  { name, age }: { name: string; age: number },
  bar: any
): void {
  console.log(arguments);
  console.log(name, age);
}

function printingPerson2(
  foo: any,
  // 自定义赋值解构的属性名称
  { name: personName, age: personAge }: { name: string; age: number },
  bar: any
): void {
  console.log(arguments);
  console.log(personName, personAge);
}
printingPerson("some text1", person4, "some text2");
// Arguments(3) ['some text1', {…}, 'some text2', callee: (...), Symbol(Symbol.iterator): ƒ]
// Matt 27

printingPerson2("some text1", person4, "some text2");
// Arguments(3) ['some text1', {…}, 'some text2', callee: (...), Symbol(Symbol.iterator): ƒ]
// Matt 27
