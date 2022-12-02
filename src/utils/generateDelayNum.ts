/**
 * @description 根据指定延迟时间逐步返回迭代上限值前的递增数
 * @author Shalling <3330689546@qq.com>
 * @date 2022-12-02 19:12:29
 * @export
 * @param {number} [limit=100] 迭代上限
 * @param {number} [delay=500] 迭代延迟
 */
export async function* useGenerateDelayNum(
  limit: number = 100,
  delay: number = 500
) {
  for (let i: number = 1; i <= limit; ++i) {
    yield new Promise((resolve: (value: unknown) => void): void => {
      setTimeout((): void => {
        resolve(i);
      }, delay);
    });
  }
}
