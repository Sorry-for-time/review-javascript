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
});
