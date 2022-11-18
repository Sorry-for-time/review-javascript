export {};

// window.performance.now() 返回一个微秒精度的浮点值
// window.performance.now() 计时器采用相对度量, 这个计时器在执行上下文创建时从 0 开始计时
console.log(window.performance.now()); // 133.6599999666214
console.log(window.performance.now()); // 133.74500000476837

// timeOrigin 属性返回计时器初始化时全局系统时钟的值
console.log("timeOrigin:", window.performance.timeOrigin); // timeOrigin: 1668761281683.565
