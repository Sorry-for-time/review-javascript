export {};

const sharedWorkerScript: string = `
  console.log("is a shared worker")
`;
// 每个基于行内脚本字符串创建的 Blob 实在浏览器内部都会被赋予自己唯一的浏览器内部 URL
// 所以行内脚本创建的共享工作者线程始终是唯一的(即开了多个页面的话, 无法共享同一个 worker, 因为 Blob 实例会多次创建 )
const sharedWorker: SharedWorker = new SharedWorker(URL.createObjectURL(new Blob([sharedWorkerScript])));
// is a shared worker

console.log(sharedWorker);
// SharedWorker { port: MessagePort, onerror: null }

// 每次调用 SharedWorker() 构造函数, 无论是否创建了工作者线程, 都会在共享线程内部触发
// connect 事件
for (let i: number = 0; i <= 4; i++) {
  new SharedWorker("/shared-worker-scripts/shared-worker1.js");
}
// 这些输出在 chrome 下可能没法看见(所以是在 firefox 上得出的)
// connected 1 times
// connected 2 times
// connected 3 times
// connected 4 times
// connected 5 times
