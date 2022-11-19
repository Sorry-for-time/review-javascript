export const enum FORMAT_STYLE {
  NORMAL = "color: black; font-size: 15px; background: white; border-radius: 3px; padding-left: 3px; padding-right: 3px",
  DANGER = "color: red; font-size: 15px; background: yellow; border-radius: 3px; padding-left: 3px; padding-right: 3px",
  PURPLE = "color: purple; font-size: 15px",
  CYAN = "color: cyan; font-size: 15px",
}

/**
 * @description console 格式化输出
 * @author Shalling <3330689546@qq.com>
 * @date 2022-11-19 18:11:34
 * @param {(FORMAT_STYLE | string)} style
 * @param {...Array<string>} params
 */
function formatLog(style: FORMAT_STYLE | string, ...params: Array<any>): void {
  let joinStr: string = "";
  for (const str of params) {
    joinStr += str;
  }
  console.log(`%c` + joinStr, style);
}

export { formatLog };
