import { FORMAT_STYLE, formatLog } from "../utils/formatLog";
export {};

fetch("/api/user", {
  method: "get",
})
  .then(async (response: Response): Promise<void> => {
    const stream = response.body;
    console.log(stream); // ReadableStream {locked: false}
    console.log(stream?.locked); // false

    // json() 方法可返回期约, 解决为将缓冲区转存得到的 JSON
    const result = await response.json();
    formatLog(FORMAT_STYLE.ORANGE, JSON.stringify(result));
    // {"name":"Wayne","sex":true,"time":"2313"}
    console.log(result.name); // Wayne
    console.log(result.sex); // true
    console.log(result.time); // 2313
  })
  .finally((): void => {
    console.log("-".repeat(40));
  });

fetch("/api/user", {
  method: "get",
})
  .then(async (response: Response): Promise<void> => {
    const buffer: ArrayBuffer = await response.arrayBuffer();
    const uint8Array: Uint8Array = new Uint8Array(buffer);
    const str: string = new TextDecoder("utf-8").decode(uint8Array);
    formatLog(FORMAT_STYLE.BLUE, str);
    // {"name":"Wayne","sex":true,"time":"2313"}
  })
  .finally((): void => {
    console.log("=".repeat(40));
  });

// 使用 blob() 方法
fetch("/api/user", {
  method: "get",
})
  .then(async (response: Response): Promise<void> => {
    // 主体流只能使用一次, 意味着所有主体混入方法只能调用一次
    const blob: Blob = await response.blob();
    // const blob2: Blob = await response.blob(); // 再次使用会报错
    const text = await blob.text();
    formatLog(FORMAT_STYLE.CYAN, text);
    formatLog(FORMAT_STYLE.CYAN, response.bodyUsed);
    // true, 表示已经在流上加了锁
  })
  .finally((): void => {
    console.log("=".repeat(40));
  });
