import "../scss/canvas.scss";
export {};

window.addEventListener("load", (): void => {
  const drawing: HTMLCanvasElement = document.querySelector("canvas")!;

  // 获取绘制上下文
  const context: CanvasRenderingContext2D = drawing.getContext("2d", {
    alpha: true /* 背景允许 alpha 通道 */,
    willReadFrequently: true,
  })!;

  context.lineWidth = 4; /* 设置描边粗细 */
  context.lineCap = "round"; /* 设置线条端点形状 */
  context.lineJoin = "round"; /* 控制线条交点形状 */

  context.strokeStyle = "cyan"; /* 设置描边颜色 */
  context.fillStyle = "hsla(6, 93%, 71%, 0.329)"; /* 设置填充颜色 */
  // 绘制起始位置, 延申距离
  context.fillRect(20, 20, 100, 100); /* 进行填充 */
  context.strokeRect(20, 20, 100, 100); /* 进行描边 */

  context.strokeStyle = "purple";
  context.fillStyle = "hsla(246, 93%, 71%, 0.329)";

  context.fillRect(80, 80, 100, 100);
  context.strokeRect(80, 80, 100, 100);

  // 清空绘制区域填充
  context.clearRect(30, 30, 40, 40);
  context.clearRect(150, 100, 20, 90);
  context.clearRect(90, 90, 20, 20);

  let imgURL: string = drawing.toDataURL("image/png");
  let image: HTMLImageElement = document.createElement("img");
  image.src = imgURL;
  document.querySelector("main")?.appendChild(image);
});
