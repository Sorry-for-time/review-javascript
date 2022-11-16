export {};

// 使用 MessageChannel
const channel: MessageChannel = new MessageChannel();
const factorialWorker = new Worker("/message-channel/worker.js");

// 把 MessagePort 对象发送到工作者线程
// 工作z者线程负责初处理初始化信道
factorialWorker.postMessage(null, [channel.port1]);

// 通过信道实际发送数据
channel.port2.onmessage = ({ data }: MessageEvent<any>): void => console.log(data);

// 工作者线程通过信道响应
channel.port2.postMessage(5);

// 5! = 120
