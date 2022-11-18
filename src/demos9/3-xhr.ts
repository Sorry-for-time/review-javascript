type METHOD = "get" | "post" | "delete" | "put";

/**
 * @description 简单封装下 xhr 请求
 * @author Shalling <3330689546@qq.com>
 * @date 2022-11-19 00:11:53
 * @param {METHOD} method 请求方法
 * @param {string} url url
 * @param {*} params 请求体参数
 * @param {number} [timeout=2000] 超时, 默认 2s
 * @param {(Array<{
 *         header: string;
 *         value: string;
 *       }>
 *     | { header: string; value: string })} [headersConfig] 头部配置
 * @returns {*}  {Promise<any>} 响应数据
 */
async function sendMessage(
  method: METHOD,
  url: string,
  params: any,
  timeout: number = 2000,
  headersConfig?:
    | Array<{
        header: string;
        value: string;
      }>
    | { header: string; value: string }
): Promise<any> {
  const xhr = new XMLHttpRequest();
  return await new Promise((resolve, reject): void => {
    // 超时的话就断开连接
    const timer: number = window.setTimeout((): void => {
      xhr.abort();
      reject("请求超时");
    }, timeout);

    // 每次 readystate 从一个值变成另一个值都会触发 readystatechange 事件
    // 为保证跨浏览器兼容, onreadystatechange 事件处理程序应该再调用 open 之前赋值
    xhr.addEventListener("readystatechange", (): void => {
      // 判断相应状态
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          clearTimeout(timer);
          resolve(xhr.response);
        } else {
          reject(xhr);
        }
      }
    });
    xhr.onerror = (reason: ProgressEvent<EventTarget>): void => {
      reason.preventDefault();
      clearTimeout(timer);
      reject(reason);
    };

    // 进行操作处理
    xhr.open(method, url);

    // 自定义头部[为了保证请求头发送成功, 必须再 open 之后, send 之前调用 setRequestHeader]
    if (Array.isArray(headersConfig)) {
      headersConfig.forEach((header): void => {
        xhr.setRequestHeader(header.header, header.value);
      });
    } else {
      headersConfig &&
        xhr.setRequestHeader(headersConfig.header, headersConfig.value);
    }
    xhr.send(params || null);
  });
}

// 失败的例子
sendMessage("get", "/api/users", null, 5000)
  .then((success: any): void => {
    console.log("%c" + `请求成功:  ${success}`, "color: cyan; font-size: 20px");
  })
  .catch((reason: any): void => {
    console.error(reason);
  });

console.log("-".repeat(40));

// 成功的例子
sendMessage("get", "/api/user", null, 3000, {
  header: "MyHeader",
  value: "23333",
})
  .then((success: any): void => {
    console.log("%c" + `请求成功:  ${success}`, "color: cyan; font-size: 20px");
    // 请求成功:  {"name":"Wayne","sex":true,"time":"2313"}
  })
  .catch((reason: any): void => {
    console.warn(reason);
  });

export { sendMessage };
