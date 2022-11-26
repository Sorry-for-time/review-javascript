import "../scss/canvas.scss";
export {};

window.addEventListener("load", (): void => {
  const drawing: HTMLCanvasElement = document.querySelector("canvas")!;
  if (drawing.getContext("2d")) {
    let imgURL: string = drawing.toDataURL("image/png");
    let image: HTMLImageElement = document.createElement("img");
    image.src = imgURL;
    document.querySelector("main")?.appendChild(image);
  }
});
