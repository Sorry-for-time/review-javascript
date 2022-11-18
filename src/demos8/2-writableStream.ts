export {};

// 可写流简单测试

/**
 * 每 1000ms 生成一个递增整数
 */
async function* ints() {
  for (let i = 0; i < 5; ++i) {
    yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
  }
}

const writableStream: WritableStream = new WritableStream({
  write(value: any): void {
    console.log(value);
  },
});

console.log(writableStream.locked); // false
const writableStreamDefaultWriter: WritableStreamDefaultWriter =
  writableStream.getWriter();
console.log(writableStream.locked); // true

// 生产者
(async (): Promise<void> => {
  for await (const chunk of ints()) {
    // WritableStreamDefaultWriter.ready 返回一个期约, 此期约会在能够向流中写入数据时解决
    await writableStreamDefaultWriter.ready;
    writableStreamDefaultWriter.write(chunk); // 输出数据
  }
  writableStreamDefaultWriter.close();
})();
// 0
// 1
// 2
// 3
// 4
