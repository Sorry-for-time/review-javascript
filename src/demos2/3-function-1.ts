export {};

/**
 * 闭包理解
 * 书里的简单定义: 闭包指的是那些引用了另一个函数作用域中变量的函数, 通常是在嵌套函数中实现的
 */

// ===========================
type DebounceInstance = () => void;

/**
 * @description 返回一个防抖函数实例
 * @author Shalling <3330689546@qq.com>
 * @date 2022-11-15 20:11:12
 * @param {Function} fn 需要进行防抖操作的函数
 * @param {number} [delay=1000] 默认延迟时间
 * @param {...Array<any>} params 函数的参数
 * @returns {*}  {DebounceInstance} 防抖包装参数
 */
function debounce(fn: Function, delay: number = 1000, ...params: Array<any>): DebounceInstance {
  let timer: number;
  let isFirst: boolean = true;

  return (): void => {
    // 如果是第一次执行函数的话, 那么立即执行, 不进行等待
    if (isFirst) {
      window.setTimeout(fn, 0, ...params);
      isFirst = false;
    } else {
      if (timer) {
        window.clearTimeout(timer);
      }
      timer = window.setTimeout(fn, delay, ...params);
    }
  };
}

// 示例
window.addEventListener("load", (): void => {
  const show: HTMLElement = document.querySelector("#code")!;
  const button: HTMLButtonElement = document.querySelector("#click")!;
  const messages = {
    title: "num value: 0",
    value: 0,
  };

  /**
   * 渲染更新 h1 的文本内容
   */
  function incrementValue(): void {
    messages.value++;
    show.textContent = `${messages.value}`;
  }

  /** @type {*} 执行间隔为 500ms 的防抖包装函数 */
  const handler: DebounceInstance = debounce(incrementValue, 500);

  button.addEventListener("click", handler);
});
