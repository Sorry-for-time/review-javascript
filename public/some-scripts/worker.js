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

// 允许在工作者线程中创建子工作者线程(顶级工作者线程的脚本和子工作者线程的脚本都必须从与主页相同的源加载)
// 使用多个子工作线程可以实现并行计算
const worker = new Worker("/some-scripts/subWorker.js");
