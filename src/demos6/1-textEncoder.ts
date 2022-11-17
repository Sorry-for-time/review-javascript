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

  // ==================================================================
  const uint8Array: Uint8Array = new Uint8Array(120);
  // encodeInto(str, uint8Array) 返回一个包含 read 和 written 属性的字典, 用于显示编码状态
  // 注: 文本编码必须始终使用 Unit8Array, 使用其它类型的定型数组会导致 encodeInto 抛出错误
  const result: TextEncoderEncodeIntoResult = textEncoder.encodeInto(testStr, uint8Array);
  // 如果定型数组空间不够, 就会立即停止编码操作
  console.log(`读取成功了 ${result.read} 个字符`); // 读取成功了 17 个字符
  console.log(`写入成功了 ${result.written} 个字符`); // 写入成功了 17 个字符

  console.log("-".repeat(40));
  // 文本解码操作, 允许设置多种字符集解码操作, 默认为 utf-8
  const utf8Decoder: TextDecoder = new TextDecoder("utf-8");
  console.log(utf8Decoder.encoding); // utf-8
  const result1 = utf8Decoder.decode(new TextEncoder().encode("how are you today?"));
  console.log(`utf-8 解码结果: ${result1}`); // utf-8 解码结果: how are you today
  // 因为字符编码集和解码集不不对应, 中文下有可能发生乱码
  console.log(new TextDecoder("gbk").decode(new TextEncoder().encode("中文?"))); // 涓枃?

  const tmpUnit8Array: Uint8Array = Uint8Array.of(102, 111, 111);
  const tmpUnit32Array: Uint32Array = Uint32Array.of(102, 111, 111);

  // 解码器不关系传入的是那种定型数组, 只会专心解码整个二进制表示
  console.log(utf8Decoder.decode(tmpUnit8Array)); // foo
  console.log(utf8Decoder.decode(tmpUnit32Array)); // f o o
});
