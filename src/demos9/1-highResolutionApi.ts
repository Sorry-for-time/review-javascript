export {};

// window.performance.now() 返回一个微秒精度的浮点值
// window.performance.now() 计时器采用相对度量, 这个计时器在执行上下文创建时从 0 开始计时
console.log(window.performance.now()); // 133.6599999666214
console.log(window.performance.now()); // 133.74500000476837

// timeOrigin 属性返回计时器初始化时全局系统时钟的值
console.log("timeOrigin:", window.performance.timeOrigin); // timeOrigin: 1668761281683.565

// 这个集合代表浏览器的性能时间线
const entry: PerformanceEntry = performance.getEntries()[0];
console.log(entry);
/*
{
  "name": "http://localhost:5173/",
  "entryType": "navigation",
  "startTime": 0,
  "duration": 168.2249999642372,
  "initiatorType": "navigation",
  "nextHopProtocol": "http/1.1",
  "renderBlockingStatus": "blocking",
  "workerStart": 0,
  "redirectStart": 0,
  "redirectEnd": 0,
  "fetchStart": 2.0149999856948853,
  "domainLookupStart": 2.0149999856948853,
  "domainLookupEnd": 2.0149999856948853,
  "connectStart": 2.0149999856948853,
  "connectEnd": 2.0149999856948853,
  "secureConnectionStart": 0,
  "requestStart": 5.629999995231628,
  "responseStart": 11.805000007152557,
  "responseEnd": 13.319999992847443,
  "transferSize": 2949,
  "encodedBodySize": 2649,
  "decodedBodySize": 2649,
  "serverTiming": [],
  "unloadEventStart": 17.82499998807907,
  "unloadEventEnd": 17.82499998807907,
  "domInteractive": 128.70999997854233,
  "domContentLoadedEventStart": 151.5199999809265,
  "domContentLoadedEventEnd": 151.88499999046326,
  "domComplete": 168.21499997377396,
  "loadEventStart": 168.21999996900558,
  "loadEventEnd": 168.2249999642372,
  "type": "reload",
  "redirectCount": 0,
  "activationStart": 0
} 116.64499998092651, domContentLoadedEventStart: 0, domContentLoadedEventEnd: 0, …}
*/

// Resourcing API
console.log(performance.getEntriesByType("resource")[0]);
/*
{
  "name": "http://localhost:5173/@vite/client",
  "entryType": "resource",
  "startTime": 18.930000007152557,
  "duration": 15.865000009536743,
  "initiatorType": "script",
  "nextHopProtocol": "http/1.1",
  "renderBlockingStatus": "non-blocking",
  "workerStart": 0,
  "redirectStart": 0,
  "redirectEnd": 0,
  "fetchStart": 18.930000007152557,
  "domainLookupStart": 18.930000007152557,
  "domainLookupEnd": 18.930000007152557,
  "connectStart": 18.930000007152557,
  "connectEnd": 18.930000007152557,
  "secureConnectionStart": 0,
  "requestStart": 31.019999980926514,
  "responseStart": 33.09500002861023,
  "responseEnd": 34.7950000166893,
  "transferSize": 78456,
  "encodedBodySize": 78156,
  "decodedBodySize": 78156,
  "serverTiming": []
}
*/
