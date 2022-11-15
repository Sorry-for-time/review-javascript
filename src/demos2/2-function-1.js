/*
函数声明的特点在于函数提升, 即指向声明会在代码执行之前定义
函数表达式则不会进行提升: 如 const sum = function(x, y) { return x+y; }
*/

function createComparisonFunction(propertyName) {
  // 只要将函数当作值来使用, 它就是一个函数表达式
  return function (object1, object2) {
    const v1 = object1[propertyName];
    const v2 = object2[propertyName];
    if (v1 < v2) {
      return -1;
    } else if (v1 > v2) {
      return 1;
    } else {
      return 0;
    }
  };
}

const o1 = {
  num: 12,
};
const o2 = {
  num: 24,
};

const resolution = createComparisonFunction("num");
console.log(resolution(o1, o2)); // -1
