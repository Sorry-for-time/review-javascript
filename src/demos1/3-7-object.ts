export {};

function Person(): void {}
const o: any = new (Person as ObjectConstructor)();
Person.prototype.sayName = () => {
  console.log("Nicholas");
};
// OK
o.sayName(); // Nicholas

/**
 * 注: 实例只有指向原型的指针, 而没有指向构造函数的指针
 */
Person.prototype = {
  constructor: Person,
  tag: "a tag",
  sayHi(): void {
    console.log("hi!");
  },
};
console.log(o.tag); // undefined
// o.sayHi() // 报错

const functionalObj = () => {
  return {
    str: "How are you today?",
  };
};
// 对于箭头函数而言, 不存在 prototype
console.log(functionalObj.prototype); // undefined
functionalObj.prototype = Person.prototype;
