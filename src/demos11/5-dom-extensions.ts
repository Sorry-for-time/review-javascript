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

  // 显示当前浏览器处于什么渲染模式下
  console.log(document.compatMode); // CSS1Compat
  // 显示当前文档的字符集,
  console.log(document.characterSet); // UTF-8

  const dataset: DOMStringMap = document.querySelector("li")!.dataset;
  // 自定义元素以 data- 开头, 这些属性不包含与渲染有关的信息, 除了前缀, 对命名没有限制, 可以通过 dataset 属性取得元素上的自定义属性实例(DomStringMap)
  // 访问的时候需要做一些命名转化,如 data-v-name 写成 vName(不需要data- 前缀, 且后 - 用驼峰替代), 如下
  console.log(dataset.vName);
  console.log(dataset.vKey);

  console.log("-".repeat(40));
  // 遍历
  Object.keys(dataset).forEach((key: string): void => {
    console.log(key, dataset[key]);
  });

  const h3: HTMLHeadingElement = document.querySelector("h3")!;

  const span: HTMLSpanElement = document.createElement("span");
  span.textContent = "(after begin tag) ";
  // 将 span 插入到 <h3> 标签后面
  h3.insertAdjacentElement("afterbegin", span);

  const span1: HTMLSpanElement = document.createElement("span");
  span1.textContent = "(before begin tag)";
  h3.insertAdjacentElement("beforebegin", span1);

  const span2: HTMLSpanElement = document.createElement("span");
  span2.textContent = " (before end tag)";
  h3.insertAdjacentElement("beforeend", span2);

  const span3: HTMLSpanElement = document.createElement("span");
  span3.textContent = " (after end tag)";
  h3.insertAdjacentElement("afterend", span3);
  /*
  大概的预览
            (before begin tag)
  (after begin tag) some text (before end tag)
            (after end tag)
  */
});
