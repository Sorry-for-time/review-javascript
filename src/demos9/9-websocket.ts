export {};
import { formatLog, FORMAT_STYLE } from "../utils/formatLog";

// ws 和 wss 的区别在于前者为非安全连接, 而后者是安全连接的()
const websocket: WebSocket = new WebSocket("wss://一个并不存在的监听器");

// 各个监听器
websocket.addEventListener("open", (event: Event) => {
  formatLog(FORMAT_STYLE.NORMAL, event);
  if (websocket.readyState === websocket.OPEN) {
    websocket.send("just some text...");
  }
  console.log(event);
});

websocket.addEventListener("message", (event: MessageEvent<any>): void => {
  formatLog(FORMAT_STYLE.ORANGE, event);
  console.log(event.data);
});

websocket.addEventListener("error", (event: Event): void => {
  formatLog(FORMAT_STYLE.DANGER, event.target);
  console.log(event);
});

websocket.addEventListener("close", (event: CloseEvent): void => {
  formatLog(FORMAT_STYLE.CYAN, event);
  console.log(event);
});
