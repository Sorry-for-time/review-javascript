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

/**
 * 继承 Array, 添加自定义洗牌方法
 */
class SuperArray extends Array {
  constructor(...params: Array<any>) {
    super(...params);
  }
  shuffle(): void {
    for (let i: number = this.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]];
    }
  }
}

const aList = new SuperArray(1, 2, 3, 4, 5);
console.log(aList); // [1, 2, 3, 4, 5];
aList.shuffle();
console.log(aList); // [3, 4, 1, 2, 5];
console.log("-".repeat(40));

// 类混入测试

class Vehicle2 {}

const FooMixin = (superClass: ObjectConstructor) =>
  class extends superClass {
    foo(): void {
      console.log("foo");
    }
  };

const BarMixin = (superClass: ObjectConstructor) =>
  class extends superClass {
    bar(): void {
      console.log("bar");
    }
  };

/**
 * 类混合函数
 * @param baseClass
 * @param mixins
 * @returns
 */
function mixing(baseClass: ObjectConstructor, ...mixins: Array<ObjectConstructor>): ObjectConstructor {
  return mixins.reduce(
    (accumulator, current) => {
      // 继承之前的类
      return current(accumulator);
    },
    // 初始值即为基类
    baseClass
  );
}

const Result: ObjectConstructor = mixing(Vehicle2 as any, FooMixin as any, BarMixin as any);
const res: any = new Result();
console.log(res); // Vehicle2 {}
res.foo(); // foo
res.bar(); // bar

console.log(res instanceof Result); // true
console.log(res instanceof Vehicle2); // true
