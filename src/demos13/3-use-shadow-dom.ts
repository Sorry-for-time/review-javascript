export {};

window.addEventListener("load", (): void => {
  const app: Element = document.querySelector("#app")!;

  for (const color of ["pink", "cyan", "purple"]) {
    const div: HTMLDivElement = document.createElement("div");
    const shadowDom = div.attachShadow({ mode: "open" });
    app.appendChild(div);
    // 每个选择符只会把样式应用到它们所在的影子 DOM 上
    shadowDom.innerHTML = `
    <p>${color}</p>
    <style>
      p {
        color: ${color};
      }
    <style>
    `;
  }

  function countP(node: Element | ShadowRoot): void {
    console.log(node.querySelectorAll("p").length);
  }
  countP(app); // 0
  app.querySelectorAll("div").forEach((element: HTMLDivElement) => {
    countP(element.shadowRoot || element);
  });

  // 1
  // 1
  // 1
});
