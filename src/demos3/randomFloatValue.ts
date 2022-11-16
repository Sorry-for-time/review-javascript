export {};

/**
 * @description 生成随机数
 * @author Shalling <3330689546@qq.com>
 * @date 2022-11-16 00:11:15
 * @returns {*}  {number}
 */
function radomFloatValue(): number {
  const fooArray = new Uint32Array(1);
  const maxUnit32 = 0xffffffff;
  return window.crypto.getRandomValues(fooArray)[0] / maxUnit32;
}
console.time("a");
for (let i: number = 0; i < 10; i++) {
  console.log(radomFloatValue());
  console.log(Math.random());
  console.log("-".repeat(40));
}
console.timeEnd("a");
