import { useThrottle } from "../utils/performanceUtil";

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

  @useThrottle(200, true)
  private moveHandler(ev: MouseEvent): void {
    this.draw(ev.clientX, ev.clientY);
  }
}

window.addEventListener("load", (): void => {
  const instance = new DecoratorTest();
  instance.bindListener();
});
