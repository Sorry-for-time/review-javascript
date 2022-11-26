export {};

window.addEventListener("load", (): void => {
  const app: HTMLDivElement = document.querySelector("#app")!;

  app.innerHTML = `
    <p slot="foo">FOO</p>
    <p slot="bar">BAR</p>
  `;

  // 允许使用命名槽位实现多个投射, 通过匹配 slot/name 属性实现
  app.attachShadow({ mode: "open" }).innerHTML = `
    <style>
      slot {
        color: cyan;
      }
    </style>
    <slot name="foo"></slot>
    <slot name="bar"></slot>
  `;
});
