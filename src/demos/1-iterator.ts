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

  /**
   * 自定义迭代器实现
   * @returns 迭代器
   */
  [Symbol.iterator]() {
    let count: number = 1;
    return {
      next: () => {
        return {
          done: count <= this.limit ? false : true,
          value: count++,
        };
      },
    };
  }
}

const counter = new Counter(3);
for (const v of counter) {
  console.log(v);
}

const counterIte = counter[Symbol.iterator]();
console.log(counterIte);

console.log("-".repeat(30));
let value = counterIte.next();
while (!value.done) {
  console.log(value);
  value = counterIte.next();
}
