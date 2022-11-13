export {};
// 注: 区别于函数, 类的定义声明不能提示, 且 函数受函数作用域限制(非严格模式下), 而类受块作用域限制

{
  function foo(): void {}
  // 默认情况, 类定义的代码都在严格模式中执行
  class A {}
  const res = typeof A;
  console.log(res); // function
}
// foo();
// console.log(A); // 3-11-object.ts:9 Uncaught ReferenceError: A is not defined

class Foo {}
const foo = new (Foo.prototype as any).constructor();
const foo1 = new Foo();
const foo2 = new Foo; // 如果不传递参数, 也可以省略 ()

console.log(foo); // Foo {}
console.log(foo1); // Foo {}
console.log(foo2); // Foo {}
console.log(Foo.prototype.constructor === Foo); // true
// 类中的 constructor 并不会被当成 prototype 上的 constructor
console.log(Foo.constructor === Foo); // false

console.log(Foo.constructor); //  Function() { [native code] }
const foo3 = new (Foo.constructor as ObjectConstructor)();
console.log(foo3); // ƒ anonymous(){}
console.log(foo3 instanceof Foo.constructor); // true

// 类也允许立即实例化
const p = new (class Qux {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
})("Fox");
console.log(p); // Qux {name: 'Fox'}
