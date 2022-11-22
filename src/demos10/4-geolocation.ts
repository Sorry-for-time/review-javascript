export {};

navigator.geolocation.getCurrentPosition(
  // success callback
  (success) => {
    console.log(success);
    console.log("cords --> ", success.coords);
    console.log("timestamp --> ",success.timestamp);
  },
  // failure callback
  (err: GeolocationPositionError): void => {
    console.warn(err);
  },
  {
    enableHighAccuracy: true /* 启用高精度位置 */,
    timeout: 4000 /* 请求最长等待时间 */,
    maximumAge:
      Infinity /* 返回坐标的最长有效期, 如果是 Infinity 的话那么系统会阻止重新查询, 只返回换存值, 如果是 0 则代表不进行任何缓存, 每次查询都请求最新的 */,
  }
);
