export {};
import { FORMAT_STYLE, formatLog } from "../utils/formatLog";

const req: Request = new Request("/api/user", {
  method: "get",
});

formatLog(FORMAT_STYLE.NORMAL, req.bodyUsed); // false

// 通过构造函数克隆副本
const req1 = new Request(req);
formatLog(FORMAT_STYLE.PURPLE, req1.bodyUsed); // false

// 通过 clone 方法克隆副本
const req2 = req.clone();
formatLog(FORMAT_STYLE.NORMAL, req2.bodyUsed); // false

// 在 fetch 中使用 request 对象
// 如果配置了 init, 那么会覆盖原有 req 的配置
// fetch 不能拿已经用过的 Request 对象来发送请求(只限带有请求体的, 不包含请求体的不会影响)
fetch(req, {
  method: "get",
})
  .then(async (res: Response): Promise<void> => {
    const result = await res.text();
    formatLog(FORMAT_STYLE.CYAN, result);
    // {"name":"Wayne","sex":true,"time":"2313"}
    formatLog(FORMAT_STYLE.CYAN, req.bodyUsed); // false
  })
  .catch((error) => {
    formatLog(FORMAT_STYLE.DANGER, error);
  });
