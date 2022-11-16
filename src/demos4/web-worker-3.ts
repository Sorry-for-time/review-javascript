export {};

// 在 javascript 行内创建工作者线程
const workerScript: string = `
    self.onmessage = ({data}) => console.log(data);
`;
// 基于脚本字符串生成 Blob 对象
const workerBlob: Blob = new Blob([workerScript]);

// 基于 Blob 实例创建对象 URL
const workerScriptURL: string = URL.createObjectURL(workerBlob);

// 基于对象 URL 创建专用工作者线程
const worker = new Worker(workerScriptURL);

worker.postMessage("blob worker script");
// blob worker script
