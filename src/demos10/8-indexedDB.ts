export {};
import { useGenerateDelayNum } from "../utils/generateDelayNum";

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
  for await (const _t of useGenerateDelayNum(10, 1000)) {
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
