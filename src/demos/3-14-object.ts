export {};

// 抽象基类
class Vehicle {
  constructor() {
    // new.target 保存通过 new 关键字调用的类或函数
    // 如果不是通过子类实例化, 就抛出错误
    if (new.target === Vehicle) {
      console.log(new.target === Vehicle); // true
      console.log(this); // Vehicle {}
      throw new Error("抽象基类不允许实例化");
    }
    // 要求子类必须的有某个方法, 否则也抛出异常
    // 因为原型方法在调用类构造函数之前就存在, 所以可以通过 this 进行检查
    if (!(this as any).sayName) {
      throw new Error("子类必须的有 sayName 这个方法");
    } else {
      console.log((this as any).sayName); // sayName(){....}
    }
  }
}

class Bus extends Vehicle {
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
    console.log(new.target.prototype === this); // false
    console.log(new.target.prototype.constructor === new.target); // true
    console.log(new.target === Bus); // true
    console.log(new.target.prototype.constructor === Bus); // true
  }
  sayName(): void {
    console.log(this.name);
  }
}

try {
  new Vehicle();
} catch (e) {
  console.warn(e);
} finally {
  console.log("-".repeat(30));
}

try {
  const bus = new Bus("A BUS");
  console.log(bus); // Bus {name: 'A BUS'}
} catch (e) {
  console.warn(e);
}
