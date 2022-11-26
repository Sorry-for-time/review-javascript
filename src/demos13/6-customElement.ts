export {};

class CustomTag extends HTMLElement {
  constructor() {
    super();
    console.log("how");
  }
}

window.addEventListener("load", (): void => {
  // 创建自定义元素
  customElements.define("custom-tag", CustomTag);

  const app: HTMLDivElement = document.querySelector("#app")!;
  app.innerHTML = `
    <custom-tag>1</custom-tag>
    <custom-tag>2</custom-tag>
    <custom-tag>3</custom-tag>
  `;
});
