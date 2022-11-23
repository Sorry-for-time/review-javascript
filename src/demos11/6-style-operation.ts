export {};

window.addEventListener("load", (): void => {
  const ul: HTMLUListElement = document.querySelector("ul")!;
  console.log(ul.style.cssText);
  // background-color: rgba(95, 158, 160, 0.153); border-radius: 10px;
  console.log(ul.style.length); // css 属性设置个数
  console.log(ul.style.parentRule); // null
  // 返回特定的 css 属性字符串表示
  console.log(ul.style.getPropertyValue("border-radius")); // 10px
  // 返回指定索引位置 style 的属性
  console.log(ul.style.item(0)); // background-color
  // 添加属性
  ul.style.setProperty("box-shadow", "0 4px 4px gray");

  // 获取计算样式(只读属性), 包含从文档样式表取得的属性的和自己设置的行内样式, 同时也包括默认继承样式
  const computedStyle: CSSStyleDeclaration =
    document.defaultView?.getComputedStyle(ul, null)!;
  console.log(computedStyle.flexBasis);

  console.log("-".repeat(40));

  // 获取样式表信息
  const styleSheets: StyleSheetList = document.styleSheets;
  const styleSheet: CSSStyleSheet =
    styleSheets[document.styleSheets.length - 1];
  const rules: CSSRuleList = styleSheet.cssRules;
  console.log(rules[0].cssText);

  // 向样式表中添加规则
  styleSheet.insertRule(`li { color: cyan }`);
  // 删除规则
  styleSheet.deleteRule(0);

  // offsetLeft 和 offsetTop 是相对于包含元素的
  const firstLi: HTMLLIElement = document.querySelectorAll("li")![0];
  const secondLi: HTMLLIElement = document.querySelectorAll("li")![1];
  console.log(firstLi.offsetHeight); // 元素的高度 24
  console.log(firstLi.offsetWidth); // 元素的宽度 649
  console.log(firstLi.offsetTop); // 元素上边框外侧距离包含元素上边框内侧的像素 48
  console.log(firstLi.offsetLeft); // 元素左侧边框外侧距离包含元素上边框的内测的像素 72
  console.log("-".repeat(40));
  console.log(secondLi.offsetHeight); // 24
  console.log(secondLi.offsetWidth); // 649
  console.log(secondLi.offsetTop); // 72
  console.log(secondLi.offsetLeft); // 72

  console.log(secondLi.offsetParent);
});
