export {};

(navigator as any).getBattery().then((status: any): void => {
  console.log(status);
  // 一些状态
  /*
  charging: true
  chargingTime: Infinity
  dischargingTime: Infinity
  level: 0.96
  onchargingchange: null
  onchargingtimechange: null
  ondischargingtimechange: null
  onlevelchange: null
  */

  // 可以手动绑定一些监听程序

  // 充电状态变化时
  status.addEventListener("chargingchange", (ev: any): void => {
    console.log(ev);
  });

  // 充电时间变化时
  status.addEventListener("chargingtimechange", (ev: any): void => {
    console.log(ev);
  });

  // 放电时间变化时
  status.addEventListener("dischargingtimechange", (ev: any): void => {
    console.log(ev);
  });

  // 电量百分比变化时的处理程序
  status.addEventListener("dischargingtimechange", (ev: any): void => {
    console.log(ev);
  });
});
