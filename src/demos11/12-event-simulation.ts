import "../scss/ul.scss";
export {};

// 模拟事件
window.addEventListener("load", (): void => {
  const li: HTMLLIElement = document.querySelector("li")!;
  const event: MouseEvent = document.createEvent("MouseEvent");
  event.initMouseEvent(
    "click",
    true,
    true,
    document.defaultView!,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  li.dispatchEvent(event);
});
