console.log(self);
// DedicatedWorkerGlobalScope {name: '专用工作者线程1', onmessage: null, onmessageerror: null, cancelAnimationFrame: ƒ, close: ƒ, …}

self.addEventListener("message", (ev) => {
  console.log("%c" + `from parent: ${ev.data}`, "font-size: 20px; color: cyan");
  self.postMessage("I have seen better.");
});
