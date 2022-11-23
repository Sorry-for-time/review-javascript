export {};

// MutationObserver 接口的使用
window.addEventListener("load", (): void => {
  // 创建一个实例
  const observer: MutationObserver = new MutationObserver(
    // 在 dom 被修改时异步执行
    (mutations: MutationRecord[], observer: MutationObserver): void => {
      console.log(mutations);
      console.log("dom was changed");
    }
  );

  // 关联 dom
  observer.observe(document.body, {
    // 监听选项配置
    attributes: true,
    attributeOldValue: true,
    childList: true,
    subtree: true,
    characterData: true,
    characterDataOldValue: true,
    // attributeFilter: [] /* 过滤器 */,
  });

  document.body.querySelector("ul")?.removeChild(document.querySelector("li")!);
  document.body.setAttribute("data-v-some", "test");
  document.body.setAttributeNS("foo", "bar", "qux");

  // 允许进行复用, 同时监听多个 dom 元素
  observer.observe(document.body.querySelector("ul")!, {
    attributes: true,
  });

  // 默认情况下, 只要有被观察的元素, observer 就不备垃圾回收, 可以调用 disconnect() 方法提前终止 dom 变化事件观察
  setTimeout((): void => {
    // 停止此后事件变化的回调, 也会抛弃已经加入到任务队列要异步执行的回调
    // 且这个方法是一刀切的, 会停止观察的所有目标
    observer.disconnect();
    // 但不会结束 MutationObserver 的生命. 还可以重新使用观察者
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      childList: true,
    });
    console.log("重新监听");

    document.querySelector("ul")!.appendChild(document.createElement("hr"));
  }, 3000);
});
