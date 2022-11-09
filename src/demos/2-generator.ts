export {};

// 生成器测试

// 生成器基本语法: 在函数表达式名称前添加 * 标注, 如下
// 限制: 箭头函数不允许定义生成器函数
function* gen1() {
  yield "1";
  yield "2";
  yield "3";
  return "qux";
}
// 在调用next 方法前状态为 suspended
const ite = gen1();
console.log(ite); // gen1 {<suspended>}
console.log(ite.next()); // { value: '1', done: false }
console.log(ite.next()); // { value: '2', done: false }
console.log(ite.next()); // { value: '3', done: false }
console.log(ite.next()); // { value: 'qux', done: true }
console.log(ite.next()); // { value: undefined, done: true }
console.log(ite.return("return")); // { value: 'return', done: true }

console.log("-".repeat(40));

for (const v of gen1()) {
  console.log(v);
}

console.log("-".repeat(40));

class ResetAbleGenerator {
  private readonly limit: number;
  constructor(limit: number) {
    this.limit = limit;
  }

  /**
   * yield the increment value
   */
  *gen() {
    for (let i: number = 1; i <= this.limit; ++i) {
      yield i;
    }
  }
}

const genInstance = new ResetAbleGenerator(4);
const tmpGenerator = genInstance.gen();
for (const v of tmpGenerator) {
  console.log(v);
  if (v > 1) {
    break;
  }
}

for (const v of tmpGenerator) {
  console.log(v); /* 无法从断点处恢复执行 */
}

// 可以通过生成器来填充数组
const arr: Array<number> = Array.from(genInstance.gen());
console.log(arr);

// 或者如下方式也 OK
function* gen2() {
  // 通过 * 增强 yield 的行为
  yield* [1, 2, 3];
  // yield* 实际上只是将一个可迭代对象序列化为一个一连串可以单独产出的值
  yield* [4, 5];
}
console.log("-".repeat(40));
for (const v of gen2()) {
  console.log(v);
}
// 1
// 2
// 3
// 4
// 5

function* gen3() {
  console.log("iter value: ", yield* [1, 2, 3, 4]);
}
console.log("-".repeat(40));

for (const v of gen3()) {
  console.log(v);
}
// 1
// 2
// 3
// 4
// iter value: undefined
