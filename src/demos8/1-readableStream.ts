export {};

/**
 * 每 1000ms 生成一个递增整数
 */
async function* ints() {
  for (let i = 0; i < 5; ++i) {
    yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
  }
}

const readableStream: ReadableStream = new ReadableStream({
  async start(controller: ReadableStreamDefaultController): Promise<void> {
    for await (const chunk of ints()) {
      // 将 5 个值加入流队列
      controller.enqueue(chunk);
    }
    // 关闭流
    controller.close();
  },
});

console.log(readableStream.locked); // false
// 取得流的锁, 保证只有这读取器可以从流中读取值
const readableStreamDefaultReader: ReadableStreamDefaultReader =
  readableStream.getReader();
console.log(readableStream.locked); // true

// 消费者
(async (): Promise<void> => {
  while (true) {
    // 使用 read 方法读取出值
    const { done, value } = await readableStreamDefaultReader.read();
    if (done) {
      break;
    } else {
      console.log(value);
    }
  }
})();
// 0
// 1
// 2
// 3
// 4
