// 关于 this 的进一步探索
window.testFLag = "outer flag";

console.log(this.testFLag); // outer flag
// 在非严格模式下 this 指向了 window, 而严格模式下输出 undefined

console.log("-".repeat(30));
const object = {
  testFLag: "object flag",
  fn() {
    return function () {
      console.log(this.testFLag);
    };
  },
};

// 每个函数在被调用时都会自动创建两格特殊变量: this 和 arguments, 内部函数永远不可能直接
// 访问外部函数的这两个变量, 所以这里的 this 其实还是 window, 输出依然为 outer flag
object.fn()(); // outer flag

const object2 = {
  testFLag: "object flag",
  fn() {
    // 将 this 保存到一个变量下
    const that = this;
    console.log(that);
    return function () {
      console.log(that.testFLag);
    };
  },
};

const receive = object2.fn(); // {testFLag: 'object flag', fn: ƒ}
receive(); // object flag

console.log("-".repeat(30));

const object3 = {
  testFLag: "object3",
  getFlag() {
    console.log(this.testFLag);
  },
};

object3.getFlag(); // object3
// 先进行了赋值, 然后再调用赋值后的结果, 因为赋值表达式为函数本身, this 值不再绑定任何对象
// 所以输出 outer flag
(object3.getFlag = object3.getFlag)(); // outer flag

console.log("-".repeat(30));
const object4 = {
  testFLag: "object4",
  getFlag() {
    console.log(this);
    console.log(this.testFLag);
  },
};
object4.getFlag();
// object4
// {testFLag: 'object4', getFlag: ƒ}

console.log("-".repeat(30));
const v = object4.getFlag;
v(); // outer flag
// Window {window: Window, self: Window, document: document, name: '', location: Location, …}
// outer flag

console.log("-".repeat(30));
const object5 = {
  testFLag: "object5",
  getFlag: () => {
    console.log(this);
    console.log(testFLag);
  },
};
object5.getFlag();
// Window {window: Window, self: Window, document: document, name: '', location: Location, …}
// outer flag
