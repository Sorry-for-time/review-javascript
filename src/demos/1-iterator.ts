export {};

// 迭代器测试
const arr: number[] = [1, 2, 3, 4];
const iterator: IterableIterator<number> = arr[Symbol.iterator]();
console.log(iterator);

let result: IteratorResult<number, any> = iterator.next();
while (!result.done) {
  console.log(result);
  result = iterator.next();
}

console.log("-".repeat(30));

class Counter {
  private readonly limit: number;
  constructor(limit: number) {
    this.limit = limit;
  }

  [Symbol.iterator]() {
    let count: number = 0;
    return {
      next: () => {
        return {
          value: ++count,
          done: count <= this.limit ? false : true,
        };
      },

      /**
       * 可选的 return 方法可用于在迭代器提前关闭时指向的逻辑
       * @returns IteratorResult, 至少包含 {done: true/false}
       */
      return() {
        console.log("提早退出");

        return {
          value: ++count,
          done: false,
        };
      },
    };
  }
}

const counter = new Counter(3);
for (const v of counter) {
  if (v > 2) {
    break; // 提早退出, 也可以使用 throw
  }
  console.log(v);
}
