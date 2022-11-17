let i = 0;
const connectedPorts = new Set();
self.onconnect = ({ ports }) => {
  /**
   * 发生 connect 事件, SharedWorker() 构造函数会隐式创建 MessageChannel 实例
   * 并把 MessagePort 实例的所有权唯一地转移给该 SharedWorker 的实例
   * 这个实例会保存在 connect 事件对象的 ports 数组中
   * 一个连接事件只能代表一个连接, 因此可以认为 ports 数组长度为 1
   */
  connectedPorts.add(ports[0]);
  console.log(`${connectedPorts.size} unique connected ports, and i counts: is ${++i} times`);
};
