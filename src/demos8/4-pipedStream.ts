export {};

// 管道流测试
/**
 * 每 1000ms 生成一个递增整数
 */
async function* ints(): AsyncGenerator<unknown, void, unknown> {
  for (let i = 0; i < 5; ++i) {
    yield await new Promise((resolve) => setTimeout(resolve, 1000, i));
  }
}
const integerStream = new ReadableStream({
  async start(controller: ReadableStreamController<any>): Promise<void> {
    for await (const chunk of ints()) {
      controller.enqueue(chunk);
    }
    controller.close();
  },
});

const doublingStream: TransformStream = new TransformStream({
  transform(chunk: any, controller: TransformStreamDefaultController): void {
    controller.enqueue(chunk * 2);
  },
});

// 通过管道流连接
const pipedStream: ReadableStream<any> =
  integerStream.pipeThrough(doublingStream);

// 从连接流的输出获得读取器
const pipedStreamDefaultController: ReadableStreamDefaultReader<any> =
  pipedStream.getReader();

// 消费者
(async (): Promise<void> => {
  while (true) {
    const { done, value } = await pipedStreamDefaultController.read();
    if (done) {
      break;
    } else {
      console.log(value);
    }
  }
})();

// 0
// 2
// 4
// 6
// 8
