export {};

document.cookie = "name=just_test";
// 最好还是使用 encodeURIComponent() 进行编码
document.cookie =
  encodeURIComponent("user") + "=" + encodeURIComponent("Nicholas");
const cookies: string = document.cookie;
console.log(cookies); // name=just_test; user=Nicholas
console.log("-".repeat(40));

// 存储事件监听测试
window.addEventListener("storage", (event: StorageEvent): void => {
  console.log(event);
});

// 注: 所有现代浏览器在实现存储写入时都使用了同步阻塞方式, 因此数据会立即提交到存储(不考虑老 IE)
window.localStorage.setItem("key1", "value1");
window.localStorage.setItem("key1", "value1111");
console.log(window.localStorage.getItem("key1")); // value111
window.localStorage.removeItem("key1");
window.localStorage.setItem("key111", "value111");
window.localStorage.clear();
