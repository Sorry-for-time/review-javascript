export {};

const o = {
  foo: "bar",
  baz: 1,
  qux: {
    lux: "some text",
  },
};

// 返回对象的键/值队数组(对于复杂属性, 仍然是浅复制操作)
const entries = Object.entries(o);
const copied: any = {};
for (const [k, v] of entries) {
  copied[k] = v;
}
console.log("copied", copied);
console.log("o", o);
// 由于取得的键值对是浅复制操作, 所以对于目标对象内部复复杂属性的修改会反应在源对象上
copied.qux.lux = "new text";
console.log("o", o);
// {foo: 'bar', baz: 1, qux: {lux: 'new text'}}
console.log("-".repeat(30));

// values(o) 可以返回对象的值数组, 且同样是浅复制
// 注: 符号属性会被忽略
console.log(Object.values(o)); // ['bar', 1, {lux: 'new text'}]
console.log(Object.values(o)[2] === o.qux); // true
