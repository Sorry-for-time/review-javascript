import { Person } from "./3-12-object";

// es6 的类允许进行单继承
class AnotherPerson extends Person {
  country: string;
  constructor(name: string, country: string) {
    // 类构造器里不允许在 super 前使用 this
    // this.country = this.country;

    // 如果父类定义了 constructor, 那么子类必须在构造器里调用 super() 或者返回一个对象
    super(name);
    this.country = country; // OK
  }
  static {
    // 调用父类的静态属性
    console.log(super.version); // v0.0
  }

  doOther(): void {
    // 调用父类的实例方法(即引用它们的原型)
    // es6 为类构造函数和静态方法添加了内部属性:[[HomeObject]], 该属性只要有 js 引擎内部能访问, 且 super 始终会定义为 [[HomeObject]] 的原型
    super.sayName();
  }

  // 重写父类发方法
  printVersion = (): void => {
    console.log("Is Another version");
  };
}

const p = new AnotherPerson("Steven", "USA");
p.doOther(); // Steven Steven
p.printVersion(); // Is Another version
