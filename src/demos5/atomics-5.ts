export {};

// 原子 Futex 操作与加锁
const workerScript: string = `
self.onmessage = ({ data }) => {
    const view = new Int32Array(data);
    console.log("waiting to obtain lock!");
    // 遇到初始值停止, 10 000 毫秒超时
    // 参数: 视图, 索引位置, 匹配值, 延迟时间
    Atomics.wait(view, 0, 0, 1e5);
    console.log("Obtained lock");
    // 在索引 0 位置加 1
    Atomics.add(view, 0, 1);
    console.log("Releasing lock");
    // 只允许一个工作线程继续执行
    Atomics.notify(view, 0, 1);
    self.postMessage(null);
  };
`;

const workerScriptBlobURL: string = URL.createObjectURL(new Blob([workerScript]));

//创建多个线程
const workers: Array<Worker> = new Array<Worker>(4);
for (let i: number = 0; i < 4; ++i) {
  workers[i] = new Worker(workerScriptBlobURL);
}

// 响应计数器
let respondCount: number = 0;
const sharedArrayBuffer: SharedArrayBuffer = new SharedArrayBuffer(8);
// 所有原子操作 Futex 只能用于 Unit32Array 视图, 且只能用在工作者线程内部
const view = new Int32Array(sharedArrayBuffer);

workers.forEach((worker: Worker): void => {
  worker.onmessage = () => {
    if (++respondCount === workers.length) {
      console.log(`Final buffer value is: ${view[0]}`);
    }
  };
});

for (const worker of workers) {
  worker.postMessage(sharedArrayBuffer);
}
// 1000 ms 后释放第一个锁
setTimeout((): void => {
  Atomics.notify(view, 0, 1);
}, 1000);
/*
waiting to obtain lock!
waiting to obtain lock!
waiting to obtain lock!
waiting to obtain lock!
... 等待 1s
Obtained lock
Releasing lock
Obtained lock
Releasing lock
Obtained lock
Releasing lock
Obtained lock
Releasing lock
Final buffer value is: 4
*/
