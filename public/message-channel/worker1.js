let messagePort = null;
let contextIdentifier = null;

function addContextAndSend(data, destination) {
  // 添加标识符以标识当前工作者线程
  data.push(contextIdentifier);
  // 把数据发送到下一个目标
  destination.postMessage(data);
}

self.onmessage = ({ data, ports }) => {
  // 如果消息里存在端口, 则初始化工作者线程
  if (ports.length) {
    // 记录标识符
    contextIdentifier = data;

    // 获取 MessagePort
    messagePort = ports[0];

    messagePort.onmessage = ({ data }) => {
      addContextAndSend(data, self);
    };
  } else {
    addContextAndSend(data, messagePort);
  }
};
