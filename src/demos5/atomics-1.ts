export {};

// 如果要使用 SharedArrayBuffer, vite 里需要配置对应的 http 响应头, 如下:
// "Cross-Origin-Opener-Policy": "same-origin",
// "Cross-Origin-Embedder-Policy": "require-corp",

const workerScript = `
  self.onmessage = ({data}) => {
    const view = new Uint32Array(data);
    // 执行1 000 000 次加操作
    // 线程不安全的加操作导致资源争用
    for(let i = 0; i < 1e6; ++i){
      view[0]+=1;
    }
    self.postMessage(null);
  }
`;

// 初始化 SharedArrayBuffer
const sharedArrayBuffer: SharedArrayBuffer = new SharedArrayBuffer(4);
console.log(sharedArrayBuffer); // SharedArrayBuffer(4)
const view = new Uint32Array(sharedArrayBuffer);
view[0] = 1;

const workerScriptBlobURL: string = URL.createObjectURL(new Blob([workerScript]));

// 创建多个工作者线程
const workers: Array<Worker> = [];
for (let i = 0; i < 4; ++i) {
  workers.push(new Worker(workerScriptBlobURL));
}

let respondCount = 0;
workers.forEach((e: Worker): void => {
  e.onmessage = (): void => {
    if (++respondCount === workers.length) {
      console.log(`final buffer value: ${view[0]}`);
      // final buffer value: 2713457
      // 总之不是 4 000 001, 因为没有使用锁机制
    }
  };
});

// 向线程传递 sharedArrayBuffer 实例(会在多个线程之间共享, 而不是单独拷贝)
for (const worker of workers) {
  worker.postMessage(sharedArrayBuffer);
}
