export {};

// 同源脚本之间能通过 BroadCastChannel 相互间发送和接收消息
const channel: BroadcastChannel = new BroadcastChannel("worker_channel");
const worker = new Worker("/message-channel/worker2.js");

channel.onmessage = ({ data }: MessageEvent<any>): void => {
  console.log(`heard ${data} on page`);
};

setTimeout(() => {
  channel.postMessage("foo");
}, 1000);

// heard foo in worker
// web-worker-7.ts:8 heard bar on page
