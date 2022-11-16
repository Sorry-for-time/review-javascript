export {};
// 专用工作者线程
const worker = new Worker("/global-scope-worker.js", {
  // 为专用工作者线程取一个名称
  name: "global-scope-web-worker",
});
console.log("created worker:", worker);
// created worker: Worker {onmessage: null, onerror: null}
// DedicatedWorkerGlobalScope {name: 'global-scope-web-worker', onmessage: null, onmessageerror: null, cancelAnimationFrame: ƒ, close: ƒ, …}

// 监听来自专用工作者线程发送的消息
worker.addEventListener("message", (ev: MessageEvent<any>): void => {
  console.log(ev.data);
});

for (let i: number = 1; i <= 13; ++i) {
  worker.postMessage(`message${i}`);
}
/*
随着循环次数增多, 会出现交替打印的现象
message1
global-scope-worker.js:4 message2
global-scope-worker.js:4 message3
global-scope-worker.js:4 message4
web-worker-1.ts:13 global-scope-web-worker: message1
global-scope-worker.js:4 message5
global-scope-worker.js:4 message6
web-worker-1.ts:13 global-scope-web-worker: message2
global-scope-worker.js:4 message7
global-scope-worker.js:4 message8
web-worker-1.ts:13 global-scope-web-worker: message3
global-scope-worker.js:4 message9
web-worker-1.ts:13 global-scope-web-worker: message4
global-scope-worker.js:4 message10
web-worker-1.ts:13 global-scope-web-worker: message5
global-scope-worker.js:4 message11
global-scope-worker.js:4 message12
web-worker-1.ts:13 global-scope-web-worker: message6
global-scope-worker.js:4 message13
web-worker-1.ts:13 global-scope-web-worker: message7
web-worker-1.ts:13 global-scope-web-worker: message8
web-worker-1.ts:13 global-scope-web-worker: message9
web-worker-1.ts:13 global-scope-web-worker: message10
web-worker-1.ts:13 global-scope-web-worker: message11
web-worker-1.ts:13 global-scope-web-worker: message12
web-worker-1.ts:13 global-scope-web-worker: message13
*/
