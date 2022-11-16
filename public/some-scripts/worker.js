/** @type {*} 所有导入的脚本会共享作用域(即 importScripts 脚本内能访问的这个 token) */
const globalToken = "bar";

console.log(`importing scripts in ${self.name} with ${globalToken}`);

// importScripts("/some-scripts/scriptA.js");
// importScripts("/some-scripts/scriptB.js");

// 或者这样也可以, importScripts 可以接受任意数量的脚本作为参数
// 浏览器下在他们的顺序没有限制, 但执行会严格按照它们在参数列表的顺序进行
/**
 * 脚本加载受到常规 CORS 的限制, 但在工作者线程内部可以请求来自任何源的脚本
 * 这里的脚本策略类似于使用生成的 <script> 标签动态加载脚本, 这种情况下, 所有导入的脚本也会共享作用域
 */
importScripts("/some-scripts/scriptA.js", "/some-scripts/scriptB.js");

console.log("scripts imported");
