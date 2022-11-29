import { formatLog, FORMAT_STYLE } from "../utils/formatLog";

export {};

let db: IDBDatabase,
  request: IDBOpenDBRequest,
  version: number = 1;

request = window.indexedDB.open("admin", version);

request.onerror = (reason): void => {
  formatLog(FORMAT_STYLE.DANGER, reason);
};

request.onsuccess = (ev): void => {
  db = (ev.target as any).result as IDBDatabase;
  console.log(db);
};

// 如果数据库不存在, open() 会创建一个新的数据库, 然后触发 onupgradeneeded 事件
// 如果数据库存在, 但是指定了一个升级版的版本号, 则会立即触发 onupgradeneeded 事件
request.onupgradeneeded = (ev): void => {
  db = (ev.target as any).result as IDBDatabase;

  // 如果存在则删除当前 objectStore
  if (db.objectStoreNames.contains("users")) {
    db.deleteObjectStore("users");
  }

  db.createObjectStore("users", {
    keyPath: "username",
  });
};

// 设置一个用户
let user = {
  username: "007",
  firstName: "James",
  lastName: "Bond",
  password: "foo",
};
