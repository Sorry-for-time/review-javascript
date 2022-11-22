export {};
const newWindow: Window | null = window.open(
  // 打开的页面
  "http://www.baidu.com",
  // 打开新页面的方式
  "_blank",
  // 属性字符串
  "height=400, width=400, top=100, left=100"
);

new Promise((resolve) => {
  setTimeout(() => {
    newWindow?.close();
    resolve(null);
  }, 2000);
}).then((): void => {
  // opener 默认指向了打开它的窗口(父窗口)
  console.log(newWindow?.opener === window); // true
  // opener 属性允许被修改, 如果将其设置为 null, 表示新打开的标签页可以运行在独立进程中(不需要与打开它的标签页通信)
  // 只要修改 location 的一个属性, 就会导致页面重新加载 URL
  // window.location.href = "https://www.bilibili.com";

  // 一些示例属性
  console.log(location.href);
  console.log(location.hostname);
  console.log(location.pathname);
  console.log(location.search);
  console.log(location.protocol);
  console.log(location.host);
  console.log(location.origin);
  console.log(location.hash);
  console.log(location.ancestorOrigins);

  // 刷新页面
  // window.location.reload();
});
