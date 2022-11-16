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
const worker: Worker = new Worker(workerScriptURL);

worker.postMessage("blob worker script");
// blob worker script

// =================================================================

// 利用函数序列化方式初始化脚本
function fibonacci(n: number): number {
  return n < 1 ? 0 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
}

// 函数的 toString() 方法返回函数代码的字符串
const workerScript1 = `
  self.postMessage(
    (${fibonacci.toString()})(9)
  );
`;

const worker1: Worker = new Worker(URL.createObjectURL(new Blob([workerScript1])));
worker1.onmessage = ({ data }): void => {
  console.log(data); // 34
};
