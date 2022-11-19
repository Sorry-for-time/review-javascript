export {};

document.cookie = "name=just_test";
// 最好还是使用 encodeURIComponent() 进行编码
document.cookie =
  encodeURIComponent("user") + "=" + encodeURIComponent("Nicholas");
const cookies: string = document.cookie;
console.log(cookies); // name=just_test; user=Nicholas
