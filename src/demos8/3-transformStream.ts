import { WritableStreamDefaultWriter } from "stream/web";

export {};
/**
 * 每 1000ms 生成一个递增整数
 */
async function* ints() {
  for (let i = 0; i < 5; ++i) {
    yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
  }
}

const { writable, readable } = new TransformStream({
  transform(chunk: any, controller: TransformStreamDefaultController): void {
    controller.enqueue(chunk * 2);
  },
});

const readableStreamDefaultReader: ReadableStreamDefaultReader =
  readable.getReader();
const writableStreamDefaultReader: WritableStreamDefaultWriter =
  writable.getWriter();

// 消费者
(async (): Promise<void> => {
  while (true) {
    const { done, value } = await readableStreamDefaultReader.read();
    if (done) {
      break;
    } else {
      console.log(value);
    }
  }
})();

// 生产者
(async (): Promise<void> => {
  while (true) {
    for await (const chunk of ints()) {
      await writableStreamDefaultReader.ready;
      await writableStreamDefaultReader.write(chunk);
    }
    writableStreamDefaultReader.close();
  }
})();
// 0
// 2
// 4
// 6
// 8
