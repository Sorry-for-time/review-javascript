export {};

// 逻辑处理器核心数量
console.log(navigator.hardwareConcurrency);

// 浏览器可使用内存, 单位: GB
console.log((navigator as any).deviceMemory);

// 返回触摸屏支持的最大关联触点数量
console.log(navigator.maxTouchPoints);
