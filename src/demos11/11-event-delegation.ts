import "../scss/ul.scss";
export {};

function handler(ev: MouseEvent): void {
  const target: EventTarget | null = ev.target;
  if (target) {
    const text: string = (target as HTMLElement).textContent || "";
    switch (text) {
      case "1":
        console.log("the li value is 1");
        break;
      case "2":
        console.log("the li value is 2");
        break;
      case "3":
        console.log("the li value is 3");
        break;
      case "4":
        console.log("the li value is 4");
        break;
      case "解绑事件":
        (ev.target as HTMLElement).parentElement?.removeEventListener(
          "click",
          handler
        );
        console.log("移除监听器");
        break;
      default:
        console.log("doesn't click the li element");
        break;
    }
  }
}

window.addEventListener("load", (): void => {
  const ulList: HTMLUListElement = document.querySelector("ul")!;
  // 使用事件委托处理过多事件处理程序问题(事件委托利用事件冒泡)
  ulList.addEventListener("click", handler);
});
