export {};

// 使用 load() 和 store() 本地重排
const sharedArrayBuffer: SharedArrayBuffer = new SharedArrayBuffer(4);
const view: Uint32Array = new Uint32Array(sharedArrayBuffer);

// 非原子写
view[0] = 1;

// 非原子写操作可与保证在这个读操作之前完成, 所以一定是 1
console.log(Atomics.load(view, 0)); // 1

Atomics.store(view, 0, 2);
// 非原子读可可以保证这个操作在原子写完成后发生, 所以一定为2
console.log(view[0]); // 2

// 原子交换
console.log("-".repeat(40));
const sharedArrayBuffer1: SharedArrayBuffer = new SharedArrayBuffer(4);
const view1: Uint32Array = new Uint32Array(sharedArrayBuffer1);
// 在索引 0 位置写入 3
Atomics.store(view1, 0, 3);
// 在索引 0 位置先读取值, 再写入 4
console.log(Atomics.exchange(view1, 0, 4)); // 3

// 从索引 0 位置读取值
console.log(Atomics.load(view1, 0)); // 4

// 在索引 0 位置写入 5
console.log("-".repeat(40));
Atomics.store(view1, 0, 5);
const initial: number = Atomics.load(view1, 0);
console.log(initial); // 5

// 对一个值执行非原子操作
let result = initial ** 2;

// 只在缓冲区未被修改的情况下才会向缓冲区写入新值
// 参数: 视图, 访问索引位置, 期待值, 写入的新值
Atomics.compareExchange(view1, 0, initial, result);

// 写入成功
console.log(Atomics.load(view1, 0)); // 25

Atomics.compareExchange(view1, 0, 1, result);
// 写入失败, 还是25
console.log(Atomics.load(view1, 0)); // 25
