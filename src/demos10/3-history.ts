export {};

console.log(window.history);

window.addEventListener("load", (): void => {
  const fragment: DocumentFragment = document.createDocumentFragment();
  const stateObj = { foo: "bar" };

  const testPushState: HTMLHeadingElement = document.createElement("h4");
  testPushState.textContent = "JUST CLICK TO TEST HISTORY pusState()";
  testPushState.addEventListener("click", (): void => {
    // pushState 方法可以改变浏览器 URL 而不会加载新页面(浏览器地址也会反映新的对应的 URL), 也不会向服务器发送请求, 执行之后状态信息会被推到历史纪录中
    // 第一个参数允许进行传递初始化页面所需的信息, 限制为 500k ~ 1MB 内
    window.history.pushState(stateObj, "MyTitle", "pushState");
  });

  const testReplaceState: HTMLHeadingElement = document.createElement("h3");
  testReplaceState.textContent = "JUST CLICK TO TEST HISTORY replaceState()";
  testReplaceState.addEventListener("click", (): void => {
    // 更新状态不会创建信的历史记录, 只会覆盖当前状态
    window.history.replaceState(
      stateObj,
      "MyTTitle",
      "http://localhost:5173/replaceState"
    );
  });

  // 单击后退按钮, 会触发 popstate 事件
  window.addEventListener("popstate", (ev: PopStateEvent): void => {
    console.log(ev);
  });

  fragment.appendChild(testPushState);
  fragment.appendChild(testReplaceState);
  document.getElementById("app")!.appendChild(fragment);
});
