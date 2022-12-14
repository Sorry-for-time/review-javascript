export {};
import { throttle } from "lodash-es";

window.addEventListener("load", (): void => {
  const mainPic: HTMLDivElement = document.querySelector(".main-pic")!;
  const cursor: HTMLSpanElement = document.querySelector(".cursor")!;
  const zoomPreview: HTMLDivElement = document.querySelector(".zoom-preview")!;

  mainPic.addEventListener("mouseover", (): void => {
    cursor.classList.remove("hidden");
    zoomPreview.classList.remove("hidden");
  });
  mainPic.addEventListener("mouseleave", (): void => {
    if (!cursor.classList.contains("hidden")) {
      cursor.classList.add("hidden");
    }
    if (!zoomPreview.classList.contains("hidden")) {
      zoomPreview.classList.add("hidden");
    }
  });
  cursor.style.willChange = "transform";
  cursor.style.setProperty("--x", "0px");
  cursor.style.setProperty("--y", "0px");
  cursor.style.transform = `translate(var(--x), var(--y))`;

  let cursorWidth: number = cursor.offsetWidth;
  let cursorHeight: number = cursor.offsetHeight;

  // 视口大小改变时重新获取元素的尺寸
  window.visualViewport?.addEventListener("resize", (): void => {
    cursorWidth = cursor.offsetWidth;
    cursorHeight = cursor.offsetHeight;
  });

  const handler = throttle((ev: MouseEvent): void => {
    ev.stopPropagation();
    ev.preventDefault();
    const offsetX: number = ev.clientX - cursor.offsetLeft,
      offsetY: number = ev.clientY - cursor.offsetTop;
    // 初始值
    let left: number = offsetX - cursorWidth / 2;
    let top: number = offsetY - cursorHeight / 2;
    if (left < 0) {
      left = 0;
    }
    if (top < 0) {
      top = 0;
    }
    if (left > mainPic.offsetWidth - cursorWidth) {
      left = mainPic.offsetWidth - cursorWidth;
    }
    if (top > mainPic.offsetHeight - cursorHeight) {
      top = mainPic.offsetHeight - cursorHeight;
    }
    cursor.style.setProperty("--x", `${left}px`);
    cursor.style.setProperty("--y", `${top}px`);

    zoomPreview.style.backgroundPosition = `${left / 2.02}% ${top / 2.02}%`;
  }, 10);

  mainPic.addEventListener("mousemove", handler);
});
