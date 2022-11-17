export {};

// 流编码

// TextEncoderStream 其实就是 TransformStream 形式的 TextEncoder(书上原话)

// 一个书上的异步字符生成器函数
async function* chars() {
  const decodeText: string = "foo";
  for (const char of decodeText) {
    yield await new Promise((resolve) => {
      setTimeout(resolve, 1000, char);
    });
  }
}

window.addEventListener("load", (): void => {
  const decodeStream: ReadableStream<any> = new ReadableStream({
    async start(controller: ReadableStreamController<any>): Promise<void> {
      for await (const chunk of chars()) {
        controller.enqueue(chunk);
      }
      controller.close();
    },
  });

  const encodeTextStream: ReadableStream<Uint8Array> = decodeStream.pipeThrough(new TextEncoderStream());

  const readableStreamDefaultReader: ReadableStreamDefaultReader<Uint8Array> = encodeTextStream.getReader();

  (async (): Promise<void> => {
    const decoder: TextDecoder = new TextDecoder("utf-8");
    while (true) {
      const { done, value } = await readableStreamDefaultReader.read();
      if (done) {
        break;
      } else {
        console.log(value);
        console.log(decoder.decode(value));
        // Unit8Array[102]
        // f

        // Unit8Array[111]
        //o

        // Unit8Array[111]
        //o
      }
    }
  })();
});
