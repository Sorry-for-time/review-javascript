import { useThrottle, effectA, effectB } from "../utils/performanceUtil";

const drawingArea: HTMLElement = document.querySelector("#axis")!;
export class DecoratorTest {
  private box: HTMLButtonElement;

  constructor() {
    this.box = document.querySelector("#test-decorator")!;
  }

  public bindListener(): void {
    this.box.addEventListener("mousemove", this.moveHandler);
  }

  public draw(x: number, y: number): void {
    drawingArea.textContent = `x: ${x}, y: ${y}`;
  }

  // 装饰器执行顺序: effectB -> effectB -> useThrottle
  @useThrottle(200, true)
  @effectA
  @effectB() // 实际上会先执行 effectB, 然后才是 effectB, 类似于 f(g(x)), 会先求 g(x), 再进行外层的计算
  private moveHandler(ev: MouseEvent): void {
    this.draw(ev.clientX, ev.clientY);
  }
}

window.addEventListener("load", (): void => {
  const instance = new DecoratorTest();
  instance.bindListener();
});
