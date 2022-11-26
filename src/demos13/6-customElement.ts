export {};

class CustomTag extends HTMLElement {
  constructor() {
    super();
    console.log("how");
  }
}

class CustomTagSecond extends HTMLDivElement {
  constructor() {
    super();
    console.log("created");
  }
}

window.addEventListener("load", (): void => {
  // 创建自定义元素
  customElements.define("custom-tag", CustomTag);

  customElements.define("custom-tag-second", CustomTagSecond, {
    extends: "div",
  });

  const app: HTMLDivElement = document.querySelector("#app")!;
  app.innerHTML = `
    <custom-tag>1</custom-tag>
    <custom-tag>2</custom-tag>
    <custom-tag>3</custom-tag>
    <div is="custom-tag-second">the div</div>
  `;
  // 如果自定义元素继承了一个元素类, 那么可以使用 is 属性和 extends 选项将该标签指定为自定义元素的实例
});
