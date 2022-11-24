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
    ev.preventDefault();
    ev.stopPropagation();
    const { clientX, clientY } = ev;
    console.log(clientX, clientY);
    if (contextMenu.classList.contains("hidden")) {
      contextMenu.classList.remove("hidden");
    }
    contextMenu.style.left = `${clientX}px`;
    contextMenu.style.top = `${clientY}px`;
  });

  window.addEventListener("click", (): void => {
    if (!contextMenu.classList.contains("hidden")) {
      contextMenu.classList.add("hidden");
    }
  });
});
