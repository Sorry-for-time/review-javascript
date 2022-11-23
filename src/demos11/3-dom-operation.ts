export {};

window.addEventListener("load", (): void => {
  const attr = document.createAttribute(
    `data-v${crypto.randomUUID().substring(0, 6)}`
  );
  attr.value = "random";
  console.log(attr);
  document.body.setAttributeNode(attr);
  // 动态添加样式
  const style: HTMLStyleElement = document.createElement("style");
  style.appendChild(
    document.createTextNode(
      `
      body {
        background: gray;
      }
      `
    )
  );

  document.head.appendChild(style);
});
