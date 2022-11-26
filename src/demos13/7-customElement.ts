export {};

class CustomOne extends HTMLElement {
  private innerP: HTMLParagraphElement | null = null;

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
          transition: 200ms ease-out;
        }

        P:hover {
          transform: scale(1.02);
          cursor: pointer;
        }

        div {
          color: purple;
        }
      </style>
      <p><slot></slot></p>
      <div><slot name="extra"></slot></div>
    `;
  }

  private clickHandler(ev: MouseEvent): void {
    console.log(ev.clientX, ev.clientY);
  }

  /**
   * 当元素渲染到真实 dom 上时触发
   */
  public connectedCallback(): void {
    console.log("connected");
    console.log("binding listener");
    this.innerP = this.shadowRoot?.querySelector("p")!;
    this.innerP && this.innerP.addEventListener("click", this.clickHandler);
  }

  /**
   * 在元素从真实 dom 上卸载时触发
   */
  public disconnectedCallback(): void {
    console.log("disconnected");
    console.log("remove listener");
    this.innerP && this.innerP.removeEventListener("click", this.clickHandler);
  }

  public attributeChangedCallback(): void {
    console.log("attributeChangedCallback");
  }

  public adoptedCallBack(): void {
    console.log("adoptedCallBack");
  }
}

window.addEventListener("load", (): void => {
  // 创建自定义元素
  customElements.define("custom-one", CustomOne);
  const app: HTMLDivElement = document.querySelector("#app")!;
  const customOne: CustomOne = new CustomOne();
  customOne.textContent = "INSIDE IN A CUSTOM ELEMENT";
  const h4: HTMLHeadingElement = document.createElement("h4");
  h4.setAttribute("slot", "extra");
  h4.textContent = "EXTRA";
  customOne.appendChild(h4);

  app.appendChild(customOne);
  setTimeout(() => {
    app.removeChild(customOne);
  }, 4000);
});
