export {};

/**
 * 概念: 理想情况下, 把 css 限制在使用它们的 dom 上: 影子 dom 最初的使用场景
 * 容纳影子 dom 的元素称为影子宿主, 影子 dom 的根节点称为 "影子根"
 * attachShadow() 方法返回影子 dom 的实例
 */
window.addEventListener("load", (): void => {
  const app: HTMLDivElement = document.querySelector("#app")!;
  // 对于 "open" 影子 DOM 的引用可以通过 shadowRoot 属性在 HTML 元素上获得(closed 则无法获取)
  const shadowRoot: ShadowRoot = app.attachShadow({ mode: "open" });
  console.log(shadowRoot); // #shadow-root(open)
  console.log(app.shadowRoot); // #shadow-root(open)
});
