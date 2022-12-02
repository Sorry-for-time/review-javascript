export {};

const user = {
  databaseName: "data-view" /* 数据库名称 */,
  databaseVersion: 1 /* 数据库版本号 */,
  storeObjectName: "data-store" /* 实例对象名称 */,
  storeObjectId: "store_id" /* 唯一 key */,
};

let database: IDBDatabase | null = null;
let objectStore: IDBObjectStore | null = null;

const openRequest: IDBOpenDBRequest = window.indexedDB.open(
  user.databaseName,
  user.databaseVersion
);

openRequest.onupgradeneeded = (): void => {
  database = openRequest.result;

  database.createObjectStore(user.storeObjectName, {
    autoIncrement: true,
    keyPath: user.storeObjectId,
  });
};

openRequest.onsuccess = async (): Promise<void> => {
  console.log("获取数据库对象成功");
  database = openRequest.result;
  for await (const _t of generateDelayNum(10, 1000)) {
    const transaction: IDBTransaction = database.transaction(
      user.storeObjectName,
      "readwrite",
      {
        durability: "relaxed",
      }
    );

    objectStore = transaction.objectStore(user.storeObjectName);
    const executeResult: IDBRequest<IDBValidKey> = objectStore.add({
      str: crypto.randomUUID(),
    });
    executeResult.onsuccess = (): void => {
      console.log("索引", executeResult.result);
    };
  }
};

openRequest.onerror = (): void => {
  console.warn(openRequest.error);
};

/**
 * 根据指定延迟时间逐步返回迭代上限值前的递增数
 * @param limit 上限
 * @param delay  迭代延迟
 */
async function* generateDelayNum(limit: number = 100, delay: number = 500) {
  for (let i: number = 1; i <= limit; ++i) {
    yield new Promise((resolve: (value: unknown) => void): void => {
      setTimeout(() => {
        resolve(i);
      }, delay);
    });
  }
}
