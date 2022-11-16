export {};

const channel: MessageChannel = new MessageChannel();
const workerA: Worker = new Worker("/message-channel/worker1.js");
const workerB: Worker = new Worker("/message-channel/worker1.js");

workerA.postMessage("workerA", [channel.port1]);
workerB.postMessage("workerB", [channel.port2]);

workerA.onmessage = ({ data }: MessageEvent<any>): void => console.log(data);
workerB.onmessage = ({ data }: MessageEvent<any>): void => console.log(data);

workerA.postMessage(["page"]);
// (3) ['page', 'workerA', 'workerB']

workerB.postMessage(["page"]);
// (3) ['page', 'workerB', 'workerA']
