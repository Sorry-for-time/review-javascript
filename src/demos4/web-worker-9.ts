export {};
/**
 * SharedBuffer 作为 ArrayBuffer 能够在不同浏览器上下文间共享,
 * 把 sharedArrayBuffer 传递给 postMessage() 时, 浏览器只会传递原始缓冲区的引用,
 * 不同的 js 上下文会分别维护对同一个内存块的引用, 即每个上下文都可以随意修改这个缓冲区
 */

const workerScript = `
self.onmessage = ({ data }) => {
    const view = new Uint8Array(data);
    console.log("buffer value before worker modification is:", view[0]);
    view[0] << 1;
    self.postMessage("左移赋值");
  };
`;

const workerScriptBlob: Blob = new Blob([workerScript]);

const worker: Worker = new Worker(URL.createObjectURL(workerScriptBlob));

// PS: SharedArrayBuffer() 在Chrome 107.0.5304.107 版本下依然被禁用, so, 不演示了
// const sharedArrayBuffer = new SharedArrayBuffer(1);
