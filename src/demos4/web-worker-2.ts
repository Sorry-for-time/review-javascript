export {};

const worker = new Worker("/terminate-worker.js", {
  // 进行一些配置
  name: "专用工作者线程1",
  type: "module",
  credentials: "same-origin",
});

/**
 * 设置 1000ms 让工作者线程进行初始化
 * 通过 self.close(), 工作者的线程并没有立即终止, 而是会通通知工作者线程取消事件循环中
 * 的所有任务, 并阻止添加新任务, 且工作者线程不需要执行同步停止
 * 在整个生命周期中, 一个专用工作者线程只会关联一个网页, 除非明确终止, 否则只要关联文存在
 * 专用工作者线程就会存在
 */
setTimeout((): void => {
  worker.postMessage("how are you today?");
  worker.terminate();
  worker.postMessage("new data");
}, 1000);
worker.onmessage = (ev: MessageEvent<any>): void => {
  console.log("%c" + `from webWorker: ${ev.data}`, "color: purple; font-size: 20px");
};
// from parent: how are you today
