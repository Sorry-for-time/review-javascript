export {};

// 跨文档消息: XDM
window.addEventListener("load", (): void => {
  const iframe: Window = document.querySelector("iframe")!.contentWindow!;
  iframe.postMessage("A secret", "http://localhost:5173");
  window.addEventListener("message", ({ data }: MessageEvent<any>): void => {
    console.log(data); // Received
  });
});
