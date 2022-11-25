export {};
import { throttle } from "lodash-es";
import "../scss/input.scss";

window.addEventListener("load", (): void => {
  const input: HTMLInputElement = document.querySelector("input")!;
  const preview: HTMLDivElement = document.querySelector(".preview-text")!;

  const handler = throttle((ev: KeyboardEvent): void => {
    console.log(ev.code);
    console.log(ev.location);

    if (ev.code === "Enter") {
      input.blur();
    }
    if (ev.code === "Escape") {
      input.blur();
    }
  }, 200);

  input.addEventListener("keydown", handler);
  input.addEventListener("input", (): void => {
    preview.textContent = input.value;
  });
});
