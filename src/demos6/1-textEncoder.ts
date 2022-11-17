export {};

window.addEventListener("load", (): void => {
  // 创建一个文本编码器
  const textEncoder: TextEncoder = new TextEncoder();
  // 测试字符串
  const testStr: string = `how are you today`;
  // 编码器始终使用 utf-8 进行编码
  console.log(textEncoder.encoding); // utf-8

  // 注: 批量编码指 js 引擎会同步编码整个字符串, 对长字符串可能会花费较长时间
  // 这里使用 worker 线程进行处理
  const workerScript = `
    self.addEventListener("message", (ev) => {
        const textEncoder = new TextEncoder();
        const array = textEncoder.encode(ev.data);
        self.postMessage(array);
    });
    `;
  // 创建一个专用的工作者线程
  const worker = new Worker(URL.createObjectURL(new Blob([workerScript.trim()])));
  // 发送待编码字符串序列
  worker.postMessage(testStr);
  // 监听来自 worker 线程发送的消息
  worker.addEventListener("message", (ev: MessageEvent<any>): void => {
    console.log(ev.data); // Uint8Array(17) [104, ..., 97, 121, buffer: ArrayBuffer(17), byteLength: 17, byteOffset: 0, length: 17, Symbol(Symbol.toStringTag): 'Uint8Array']
  });
});
