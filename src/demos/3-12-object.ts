export {};

const aKey = "getVersion";

class Person {
  // 通过 static 关键字可以直接将属性设置为类的静态属性
  static version: string = "v0.0";
  static version2: string = "v0.1";

  static doSome = () => {};
  static doSome1() {}
  // 多个属性在 ts 语法中允许, 但在 js 中 静态成员只有一个, 实际被编译成如下, static 代码块允许多个
  // static { this.version = "v0.0"; }
  // static { this.version2 = "v0.1"; }
  // static { this.doSome = () => { }; }
  // static doSome1() { }

  // 静态代码块在类代码被 js 引擎加载时便会执行
  static {
    console.log("init1");
  }
  // 允许设置多个静态代码块
  static {
    console.log("init2");
  }

  private _name: string; /* 这是仅限 ts 支持的语法 */
  // 类快中不允许给原型添加原始值或对象作为成员数据

  constructor(name: string) {
    // constructor 里定义的属性在类实例化后是独立的
    this._name = name;
  }

  // 允许使用计算的值作为键
  [aKey](): string {
    return Person.version;
  }

  // 类定义语法把在类块中定义的方法作为原型方法
  // 在类块中定义的所有属性都会定义在类的原型上
  sayName(): void {
    console.log(this.name, this._name);
  }

  printVersion = (): void => {
    console.log(Person.version);
  };

  /**
   * 定义生成器方法
   */
  *getSomeDataIterator() {
    for (let i: number = 1; i <= 3; i++) {
      yield i;
    }
  }

  static *getV1() {
    yield "How are you today?";
  }

  // 允许定义多个生成器方法
  static *getV2() {
    yield "I have seen better";
  }

  // 允许添加默认迭代器, 把类实例变成可迭代对象
  *[Symbol.iterator]() {
    // 返回序列化字符
    yield* this.name;
  }

  // 也可以定义只返回迭代器实例(前提需要没定义类实例自身的迭代器
  // [Symbol.iterator]() {}

  // 类中允许为属性设置访问器
  get name(): string {
    return this._name;
  }

  set name(str: string) {
    this._name = str;
  }
}

const p = new Person("Wayne");
console.log(p); // Person {_name: 'Wayne'}
p.sayName(); // Wayne Wayne
p.printVersion(); // v0.0
console.log((Person.prototype.constructor as any).version); // v0.0
console.log(Person.version); // v0.0
console.log((Person.constructor as any).version); // undefined
console.log(Person.prototype); // constructor..., sayName..., get name..., setName...
for (const v of p.getSomeDataIterator()) {
  console.log(v);
}
// 1
// 2
// 3
for (const v of Person.getV1()) {
  console.log(v); // How are you today
}

for (const v of Person.getV2()) {
  console.log(v); // I have seen better
}
console.log("-".repeat(40));
for (const v of p) {
  console.log(v);
}
// w
// a
// y
// n
// e
