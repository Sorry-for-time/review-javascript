window.color = "RED";

function sayColor() {
  console.log(this.color);
}

const obj = {
  color: "BLUE",
};
// 标准函数中, this 引用的是把函数当成方法调用的山下问对象
sayColor(); // RED
obj.sayColor = sayColor;
obj.sayColor(); // BLUE, 因为此时 this 是 obj 内部

const func2 = () => {
  console.log(this.color);
};

console.log("-".repeat(30));
func2(); // RED
obj.func2 = func2;
// 在箭头函数中, this 引用的是定义箭头函数的上下文, 所以这里还是2
obj.func2(); // RED

console.log("~".repeat(30));

function func3() {
  this.name = "Bruce";
  const say = () => {
    console.log(this.name);
  };

  return say;
}

func3()(); // BRUCE
const obj4 = func3();
obj4(); // BRUCE

console.log("~".repeat(30));
const obj5 = {
  log: "LOG",
  sayLog: () => {
    console.log(this.log);
  },
};

obj5.sayLog(); // undefined

const log = "OUTER";
const say = obj5.sayLog;
say(); // undefined
