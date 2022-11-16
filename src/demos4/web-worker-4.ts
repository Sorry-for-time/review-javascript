export {};

// 使用 importsScripts() 方式加载和执行任意脚本

const worker: Worker = new Worker("/some-scripts/worker.js");
console.log(worker);
// Worker {onmessage: null, onerror: null}
// worker.js:1 importing scripts
// scriptA.js:1 script A executes
// scriptB.js:1 scriptB executes
// worker.js:10 scripts imported
