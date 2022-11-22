export {};

// 节点类型为定义在 Node 类型上的 12 个常量数值表示
console.log(Node.ELEMENT_NODE); // 1
console.log(Node.ATTRIBUTE_NODE); //2
console.log(Node.TEXT_NODE); //3
console.log(Node.CDATA_SECTION_NODE); // 4
console.log(Node.ENTITY_REFERENCE_NODE); // 5
console.log(Node.PROCESSING_INSTRUCTION_NODE); // 6
console.log(Node.COMMENT_NODE); // 7
console.log(Node.DOCUMENT_NODE); // 8
console.log(Node.DOCUMENT_TYPE_NODE); // 9
console.log(Node.DOCUMENT_FRAGMENT_NODE); // 10
console.log(Node.NOTATION_NODE); // 11

console.log("-".repeat(40));
const nodes: NodeListOf<ChildNode> = document.body.childNodes;
console.log("before", nodes);
document.body.appendChild(document.createElement("span"));
console.log("after", nodes);
// 每个节点都有一个 childNodes 属性, 其中包含一个 NodeList 实例, 其独特在于其实是一个 dom 结构的查询, 因此 dom 结构的变化会自动地在 NodeList 上反映出来 --> 即为一个活动对象, 而不是第一次获取时所获得内容的快照

console.log("-".repeat(40));
// 将类数组转化为数组
const timeNodes: Array<ChildNode> = Array.from(nodes);
timeNodes.forEach((v) => {
  console.log(v);
});

// 判断一个节点是否包含一个或多个子节点
console.log(document.body.querySelector("#app")!.hasChildNodes());

// 可以通过 nextSibling 访问当前节点相邻的下一个节点
// 可以通过 previousSibling 访问当前节点相邻的上一个节点

// ownerDocument 属性是一个指向代表整个文档的节点的指针
console.log(timeNodes[0].ownerDocument);
