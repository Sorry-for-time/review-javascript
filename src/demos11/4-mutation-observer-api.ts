export {};

// MutationObserver 接口的使用
window.addEventListener("load", (): void => {
  // 创建一个实例
  const observer: MutationObserver = new MutationObserver(
    // 在 dom 被修改时异步执行
    (mutations: MutationRecord[], _observer: MutationObserver): void => {
      console.log(mutations);
      console.log("dom was changed");
    }
  );

  // 关联 dom
  observer.observe(document.body, {
    // 监听选项配置(至少的配置一个属性为 true)
    attributes: true /* 观察属性节点的变化 */,
    // attributeFilter: [] /* 设置监听的属性的白名单(即要进行记录的) */,
    attributeOldValue: true /* 记录变化之前的属性值(所有都会被记录下来) */,
    childList: true /* 修改目标节点触发事件变化 */,
    subtree:
      true /* 除目标节点, 观察目标节点的子树(子树中的节点被移出子树后仍然能够触发变化事件) */,
    characterData: true /* 修改字符数据触发变化事件 */,
    characterDataOldValue: true /* 记录变化之前的字符数据 */,
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

  // 调用 takeRecords() 方法可以清空记录队列, 取出并返回其中的所有 MutationRecord 实例
  const records: MutationRecord[] = observer.takeRecords();
  console.log("records -->", records);
});
// MutationObserver 实例与目标节点之间引用关系是非对称的 --> 弱引用, 所以不会妨碍垃圾回收程序回收目标节点
// 但目标节点却拥有对 MutationObserver 的强引用, 如果目标节点被回收, 那么关联的  MutationObserver 也会
// 被回收
