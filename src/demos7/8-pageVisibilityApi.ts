export {};

window.addEventListener("load", (): void => {
  window.document.onvisibilitychange = (event: Event): void => {
    console.log(document.visibilityState);
    // 可能的取值有: hidden, visible, prerender
    console.log(event);
  };
});
