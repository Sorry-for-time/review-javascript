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
