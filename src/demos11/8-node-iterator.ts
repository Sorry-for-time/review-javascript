export {};

window.addEventListener("load", (): void => {
  const iterator: NodeIterator = document.createNodeIterator(
    document.body /* 访问的起始节点 */,
    // NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
    NodeFilter.SHOW_ELEMENT /* 数值代码, 表示该访问哪些节点 */
  );

  for (
    // 第一次调用访问的时候返回的是根节点
    let node: Node | null = iterator.nextNode();
    node;
    node = iterator.nextNode() /* nextNode() 方法默认以深度优先的方式进行访问 */
  ) {
    console.log(
      "previous node ->",
      node.previousSibling?.nodeName,
      "; current Node ->",
      node.nodeName,
      "; next Node ->",
      node.nextSibling?.nodeName
    );

    // 后台异步
    // iterator.previousNode();
    // 前进一步
    // iterator.nextNode();
  }
  console.log("-".repeat(70));

  const treeWalker: TreeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ELEMENT
  );
  for (
    // 不会包含根节点, 第一次直接访问第一个子节点
    let node: Node | null = treeWalker.nextNode();
    node;
    node = treeWalker.nextNode()
  ) {
    console.log(node);
  }
});
