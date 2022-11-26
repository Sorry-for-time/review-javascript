export {};

window.addEventListener("load", (): void => {
  const template: HTMLTemplateElement = document.querySelector("template")!;
  const fragment: DocumentFragment = template.content;
  console.log(fragment); // #document-fragment
  console.log(template.content.querySelector("p")); // <p>Inside a template</p>

  const app: HTMLDivElement = document.querySelector("#app")!;

  // 可以使用 importNode() 方法克隆 DocumentFragment
  app.appendChild(document.importNode(template.content, true));
});
