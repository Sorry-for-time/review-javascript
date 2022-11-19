export {};

fetch("/api/user")
  // 期约返回一个 Promise 对象
  .then((response: Response): Promise<string> => {
    console.log(response);
    // Response {type: 'basic', url: 'http://localhost:5173/api/user', redirected: false, status: 200, ok: true, …}

    // 可以取得一堆响应码什么的
    console.log(response.status); // 200
    console.log(response.statusText); // OK
    return response.text(); /* 可以调用 text 方法取得文本内容 */
  })
  .then((res: string): void => {
    console.log(res);
    console.log("-".repeat(40));
  });

fetch("/api/user", {
  // 允许通过 init 配置一些参数
  cache: "force-cache",
  credentials: "same-origin",
  headers: {} /* 设置自定义请求头部 */,
  integrity: "" /* 检测资源完整性, 默认为空字符串 */,
  method: "get",
  keepalive: true,
  mode: "no-cors" /* 指定请求模式 */,
  redirect: "error" /* 指定如何让处理重定向响应 */,
  referrer: "no-referrer" /* 用于指定 HTTP 的 Referer 头部内容 */,
  referrerPolicy: "unsafe-url" /* 指定 HTTP Referer 头部 */,
  signal:
    null /* 用于支持通过 AbortController 中断进行的 fetch() 请求, 默认为未关联控制器的 AbortSignal 实例 */,

  // body: "参数", /* 可以通过 body 设置请求携带参数 */
  // get 请求不允许设置设置携带参数
})
  .then((response: Response): Promise<string> => {
    console.log(response);
    return response.text();
  })
  .then((result: string): void => {
    console.log(result);
  });
