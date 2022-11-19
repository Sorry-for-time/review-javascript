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
