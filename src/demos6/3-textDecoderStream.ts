export {};

async function* chars() {
  // 每个块必须是一个定型数组
  //   const encodeText: Array<Uint8Array> = [102, 111, 111].map((e: number): Uint8Array => Uint8Array.of(e));
  // 😊 的十进制编码如下
  const encodeText: Array<Uint8Array> = [240, 159, 152, 138].map((e: number): Uint8Array => Uint8Array.of(e));

  for (const char of encodeText) {
    yield await new Promise((resolve) => setTimeout(resolve, 1000, char));
  }
}

window.addEventListener("load", (): void => {
  const encodedTextStream = new ReadableStream({
    async start(controller: ReadableStreamController<any>): Promise<void> {
      for await (const chunk of chars()) {
        controller.enqueue(chunk);
      }
      // 关闭控制器
      controller.close();
    },
  });

  const decodedTextStream: ReadableStream<string> = encodedTextStream.pipeThrough(new TextDecoderStream());

  const readableStreamDefaultReader: ReadableStreamDefaultReader<string> = decodedTextStream.getReader();

  (async (): Promise<void> => {
    let str: string = "";
    while (true) {
      const { done, value } = await readableStreamDefaultReader.read();
      if (done) {
        break;
      } else {
        // 文本解码器流能识别可能分散子啊不同块上的代理对, 解码器流会保持片段直到
        // 取得完整的字符
        console.log(value); // 😊(这里只会输出一次, 因为流解码器在解码流输出字符之前会等待传入 4 个块)
        str += value;
      }
    }

    console.log(str); // 😊
  })();
});
