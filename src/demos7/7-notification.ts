export {};

window.addEventListener("load", (): void => {
  Notification.requestPermission().then((permission: NotificationPermission): void => {
    console.log(`User responded to permission request: ${permission}`);
  });

  // 最简单的形式
  //   new Notification("title");

  const notification: Notification = new Notification("主标题文本区域", {
    body: "正文内容, 假设是这样子: 每日新图片更新通知(在 5s 后自动进行关闭)",
    icon: "/vite.svg",
    image: "/imgs/wallpaper.png",
    vibrate: 0,
    badge: "2333",
    dir: "ltr",
    lang: "zh",
    tag: "随便的 tag",
    timestamp: 223,
    // 还有一堆配置项目
  });

  // 生命周期函数
  notification.addEventListener("show", (): void => {
    console.log("show is active");
  });

  notification.addEventListener("click", (event: Event): void => {
    console.log(`click event: ${event}`);
  });

  notification.addEventListener("close", (event: Event): void => {
    console.log(`close event: ${event}`);
  });

  notification.addEventListener("error", (event: Event): void => {
    console.log(`error event: ${event}`);
  });

  setTimeout((): void => {
    notification.close();
  }, 5000);
});
