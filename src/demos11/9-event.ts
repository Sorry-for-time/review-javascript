export {};
import "../scss/context-menu.scss";

window.addEventListener("load", (): void => {
  const area: HTMLDivElement = document.querySelector(".main-pic")!;
  area.addEventListener(
    "click",
    function (ev): void {
      ev.stopPropagation();
      console.log(this);
      console.log(ev.type);
      console.log(ev.bubbles);
      console.log(ev.cancelable);
      console.log(ev.currentTarget);
      console.log(ev.detail);
      console.log(ev.defaultPrevented);

      // 如果事件在捕获阶段被调用, 则等于1
      // 如果事件处理程序在目标上被调用, 则等于2
      // 如果事件处理程序在冒泡阶段被调用, 则等于3
      console.log(ev.eventPhase);
    },
    // 配置项
    {
      passive: true,
      once: false,
    }
  );

  // 自定义右键菜单模拟
  const contextMenu: HTMLDivElement = document.querySelector(".context-menu")!;
  area.addEventListener("contextmenu", (ev: MouseEvent): void => {
    ev.preventDefault(); /* 取消默认行为的事件 */
    ev.stopPropagation(); /* 立即阻止事件流在 Dom 结构中传播, 取消后续的事件捕获或者冒泡 */
    const { clientX, clientY } = ev;
    console.log(clientX, clientY);
    if (contextMenu.classList.contains("hidden")) {
      contextMenu.classList.remove("hidden");
    }
    contextMenu.style.left = `${clientX}px`;
    contextMenu.style.top = `${clientY}px`;
  });

  window.addEventListener(
    "click",
    (ev: MouseEvent): void => {
      console.log(ev.eventPhase);
      if (!contextMenu.classList.contains("hidden")) {
        contextMenu.classList.add("hidden");
      }
    },
    true /* 在捕获阶段调用 */
  );
});
