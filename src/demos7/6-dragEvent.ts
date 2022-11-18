export {};

// 元素自定义放置目标
window.addEventListener("load", (): void => {
  const dragItem: HTMLElement = document.querySelector(".drag-item")!;
  const dropTargets: NodeListOf<HTMLElement> = document.querySelectorAll(".drop-target")!;
  dropTargets.forEach((dropTarget: HTMLElement): void => {
    dropTarget.addEventListener("dragover", (event: DragEvent): void => {
      event.preventDefault();
    });

    dropTarget.addEventListener("dragenter", (event: DragEvent): void => {
      event.preventDefault();
    });

    dropTarget.addEventListener("drop", (event: DragEvent): void => {
      event.preventDefault();
      if (dragItem) dropTarget.appendChild(dragItem);
      console.log(event.dataTransfer);
    });
  });
});
