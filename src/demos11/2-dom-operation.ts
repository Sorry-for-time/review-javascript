export {};

/**
 * 将新节点插入到一个参照节点之前
 * @param current 参照节点
 * @param newNode  新节点
 * @returns 新节点本身
 */
function insertNodeBefore(current: Node, newNode: Node): Node | undefined {
  return current.parentNode?.insertBefore(newNode, current);
}

/**
 * 将新节点插入到一个参照节点之后
 * @param current 参照节点
 * @param newNode 新节点
 * @returns 新节点本身
 */
function insertNodeAfter(current: Node, newNode: Node) {
  return current.parentNode?.insertBefore(newNode, current.nextSibling);
}

window.addEventListener("load", (): void => {
  const container: HTMLUListElement = document.querySelector("ul")!;
  const current: ChildNode = container.childNodes[1];
  console.log(current.textContent); // 2

  // 新节点
  const newNode: HTMLLIElement = document.createElement("li");
  newNode.textContent = "1";

  console.log(insertNodeBefore(current, newNode)?.textContent); // 1

  const newAfterNode: HTMLLIElement = document.createElement("li");
  newAfterNode.textContent = "a random value";
  insertNodeAfter(container.firstChild!, newAfterNode);

  const replaced: HTMLLIElement = document.createElement("li");
  replaced.textContent = "replaced";

  // 将父节点的子节点列表中的元素替换为指定的新元素, 会返回被替换掉的节点
  // 参数: 要插入的新节点, 要替换掉的旧节点
  console.log(
    container.replaceChild(
      replaced,
      container.children[container.children.length - 1]
    )
  );
  // <li>4</li>
});
