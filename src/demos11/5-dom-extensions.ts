export {};
// DOM 拓展

window.addEventListener("load", (): void => {
  // 通过 querySelectorAll() 返回的是静态的 NodeList 实例, 而不是实时的查询, 可以避免一些循环处理 dom 元素上的问题
  const liList: NodeListOf<HTMLElement> = document.querySelectorAll("li");
  liList.forEach((item: HTMLElement): void => {
    console.log(item);
  });
  console.log("-".repeat(40));

  // 通过下标取得
  console.log(liList.item(1));

  // 检测元素会不会被 querySelector 和  querySelectorAll 返回
  const isMatched: boolean = document.querySelector("#app")!.matches("#app");
  console.log(isMatched);

  const ul: HTMLUListElement = document.querySelector("ul")!;
  console.log(ul.childElementCount); // 不包含文本节点和注释的字节数量
  console.log(ul.firstElementChild); // 不包含文本节点和注释的第一个子节点
  console.log(ul.lastElementChild); // 不包含文本节点和注释的最后一个子节点
  console.log(ul.lastElementChild!.previousElementSibling); // 不包含文本节点和注释的前一个相邻节点
  console.log(ul.firstElementChild!.nextElementSibling); // 不包含文本节点和注释的后一个相邻节点
});
