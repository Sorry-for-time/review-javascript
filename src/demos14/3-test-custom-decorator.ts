import { useThrottle, effectA, effectB } from "../utils/performanceUtil";

const drawingArea: HTMLElement = document.querySelector("#axis")!;
export class DecoratorTest {
  private box: HTMLElement;

  constructor(selector: string) {
    const res: HTMLButtonElement = document.querySelector(selector)!;
    if (res) {
      this.box = res;
    } else {
      throw new Error("can not get the dom target");
    }
  }

  public bindListener(): void {
    this.box!.addEventListener("mousemove", this.moveHandler);
  }

  public draw(x: number, y: number): void {
    drawingArea.textContent = `x: ${x}, y: ${y}`;
  }

  // 装饰器执行顺序: effectB -> effectB -> useThrottle
  @useThrottle(200, true)
  @effectA
  @effectB() // 实际上会先执行 effectB, 然后才是 effectB, 类似于 f(g(x)), 会先求 g(x), 然后才是 f(x)
  private moveHandler(ev: MouseEvent): void {
    this.draw(ev.clientX, ev.clientY);
  }
}

window.addEventListener("load", (): void => {
  const instance = new DecoratorTest("#test-decorator");
  instance.bindListener();
});
