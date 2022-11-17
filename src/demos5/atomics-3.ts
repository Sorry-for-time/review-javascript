export {};

// 使用 Atomics 改写 atomics-1.ts, 实现线程安全操作
const workerScript = `
  self.onmessage = ({data}) => {
    // 创建一个视图
    const view = new Uint32Array(data);
    // 执行1 000 000 次加操作
    // 线程不安全的加操作导致资源争用
    for(let i = 0; i < 1e6; ++i){
      Atomics.add(view, 0, 1);
    }
    self.postMessage(null);
  }
`;

const sharedArrayBuffer: SharedArrayBuffer = new SharedArrayBuffer(4);
console.log(sharedArrayBuffer); // SharedArrayBuffer(4)
const view = new Uint32Array(sharedArrayBuffer);
view[0] = 1;

const workerScriptBlobURL: string = URL.createObjectURL(new Blob([workerScript]));

// 创建多个工作者线程
const workers: Array<Worker> = new Array<Worker>(4);
for (let i: number = 0; i < 4; ++i) {
  workers[i] = new Worker(workerScriptBlobURL);
}

let respondCount = 0;
workers.forEach((e: Worker): void => {
  e.onmessage = (): void => {
    if (++respondCount === workers.length) {
      console.log(`final buffer value: ${view[0]}`);
      // 因为使用了 Atomics Api 进行加操作的原子操作, 所以得到正常的值: 4 000 001
    }
  };
});

// 向线程传递 sharedArrayBuffer 实例(会在多个线程之间共享, 而不是单独拷贝)
for (const worker of workers) {
  worker.postMessage(sharedArrayBuffer);
}
