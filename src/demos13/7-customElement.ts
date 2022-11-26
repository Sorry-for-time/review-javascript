export {};
import { FORMAT_STYLE, formatLog } from "../utils/formatLog";

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

  /**
   * 处理元素点击时的触发
   * @param ev 点击事件
   */
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

  public attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    formatLog(FORMAT_STYLE.NORMAL, "attributeChangedCallback");
    if (oldValue !== newValue) {
      formatLog(FORMAT_STYLE.NORMAL, `${oldValue} --> ${newValue}`);
      (<any>this)[name] = newValue;
    }
  }

  public adoptedCallBack(): void {
    formatLog(FORMAT_STYLE.NORMAL, "adoptedCallBack");
  }

  public get bar(): string {
    formatLog(FORMAT_STYLE.CYAN, "get bar");
    return this.getAttribute("bar")!;
  }

  public set bar(newValue: string) {
    formatLog(FORMAT_STYLE.ORANGE, "set bar");
    this.setAttribute("bar", newValue);
  }

  static get observedAttributes(): Array<string> {
    return ["bar"];
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
  customOne.setAttribute("bar", "some-values");
  console.log(customOne.getAttribute("bar"));
  customOne.setAttribute("bar", "other-values");
  console.log(customOne.bar);

  /* new Promise((resolve): void => {
    setTimeout(() => {
      resolve(app.removeChild(customOne));
    }, 4000);
  }).then((res: unknown): void => {
    console.log("-".repeat(40));
    console.log(res);
    app.appendChild(res as CustomOne);
  }); */
});
