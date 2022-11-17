export {};

const sharedArrayBuffer: SharedArrayBuffer = new SharedArrayBuffer(1);
const typedArray: Uint8Array = new Uint8Array(sharedArrayBuffer);

console.log(typedArray); // Unit8Array[0]
const index = 0;
const increment = 5;

// 使用 Atomics API 在索引 0 位置执行原子加操作
Atomics.add(typedArray, index, increment);
console.log(typedArray); // Unit8Array[5]

// 使用 Atomics API 在索引 0 位置执行原子减操作
Atomics.sub(typedArray, index, increment);
console.log(typedArray); // Unit8Array[0]

// 对索引 0 位置的值执行原子或 0b1111
Atomics.or(typedArray, 0, 0b1111);
console.log(typedArray); // Unit8Array[15]

// 对索引 0 位置的值执行原子与 0b1111
Atomics.and(typedArray, 0, 0b1100);
console.log(typedArray); // Unit8Array[12]

// 对索引 0 位置的值执行原子异或 0b1111
Atomics.xor(typedArray, 0, 0b1111);
console.log(typedArray); // Unit8Array[3]
