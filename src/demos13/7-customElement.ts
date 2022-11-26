export {};

class CustomOne extends HTMLElement {
  constructor() {
    super();
    // 引用 web 组件节点
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
      <style>
        p {
          font-size: 20px;
          color: cyan;
          cursor: default;
          user-select: none;
        }
        div {
          color: purple;
        }
      </style>
      <p><slot></slot></p>
      <div><slot name="extra"></slot></div>
    `;
    // 在内部添加监听器
    this.shadowRoot
      ?.querySelector("p")!
      .addEventListener("click", (ev: MouseEvent): void => {
        console.log(ev.target);
      });
  }
}

window.addEventListener("load", (): void => {
  // 创建自定义元素
  customElements.define("custom-one", CustomOne);
  const app: HTMLDivElement = document.querySelector("#app")!;
  const customOne: CustomOne = document.createElement("custom-one");

  customOne.textContent = "INSIDE IN A CUSTOM ELEMENT";
  const h4: HTMLHeadingElement = document.createElement("h4");
  h4.setAttribute("slot", "extra");
  h4.textContent = "EXTRA";
  customOne.appendChild(h4);

  app.appendChild(customOne);
});
