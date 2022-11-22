export {};

// 失去网络连接时触发
window.addEventListener("offline", (): void => {
  console.log(navigator.onLine); // false
});

// 恢复网络连接时触发
window.addEventListener("online", (): void => {
  console.log(navigator.onLine); // true
});

// 查看网络连接的一些基本属性
console.log((navigator as any).connection);
/*
downlink: 1.3 当前设备带宽(以 MBit/s 为单位)
effectiveType: "3g"
onchange: null 事件处理程序
rtt: 300 -> 网络实际往返时间
saveData: false 是否启用节流模式
*/
(navigator as any).connection.addEventListener("change", (ev: any): void => {
  console.log(ev);
});
