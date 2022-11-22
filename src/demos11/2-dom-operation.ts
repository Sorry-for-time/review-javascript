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
});
