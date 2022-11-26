export {};

window.addEventListener("load", (): void => {
  const app: HTMLDivElement = document.querySelector("#app")!;

  for (const color of ["cyan", "purple", "pink"]) {
    const div: HTMLDivElement = document.createElement("div");
    div.innerText = `${color}`;
    app.appendChild(div);
    // 原来的内容会替代 slot 进行展示, 以下为使用默认槽位
    // 虽然在页面窗口中看到的内容在影子 DOM 中, 但实际上只是 DOM 内容的投射, 实际的元素仍然在外部 DOM 中
    div.attachShadow({
      mode: "open",
    }).innerHTML = `
      <p><slot></slot></p>
      <style>
        p {color: ${color};}
      </style>
    `;
  }

  const firstDiv: HTMLDivElement = app.querySelectorAll("div")[0];
  console.log(firstDiv);
});
