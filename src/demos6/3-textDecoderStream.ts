export {};

async function* chars() {
  // 每个块必须是一个定型数组
  const encodeText: Array<Uint8Array> = [102, 111, 111].map((e: number): Uint8Array => Uint8Array.of(e));
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
        console.log(value);
        str += value;
      }
    }
    // f
    // o
    // o

    console.log(str);
    // foo
  })();
});
