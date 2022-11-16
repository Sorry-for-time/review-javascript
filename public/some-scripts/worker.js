console.log("importing scripts");

// importScripts("/some-scripts/scriptA.js");
// importScripts("/some-scripts/scriptB.js");

// 或者这样也可以, importScripts 可以接受任意数量的脚本作为参数
// 浏览器下在他们的顺序没有限制, 但执行会严格按照它们在参数列表的顺序进行
importScripts("/some-scripts/scriptA.js", "/some-scripts/scriptB.js");

console.log("scripts imported");
