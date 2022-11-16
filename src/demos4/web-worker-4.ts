export {};

// 使用 importsScripts() 方式加载和执行任意脚本

const worker: Worker = new Worker("/some-scripts/worker.js", {
  name: "FOO",
});

console.log(worker);
// Worker {onmessage: null, onerror: null}
// importing scripts in FOO with bar
// scriptA.js:1 script A executes in FOO with bar
// scriptB.js:1 scriptB executes in FOO with bar
// worker.js:13 scripts imported
