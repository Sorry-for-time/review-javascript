export {};

// 读取拖放文件信息
window.addEventListener("load", (): void => {
  // 文件拖放的目标位置
  const dropTarget: HTMLDivElement = document.querySelector("#app .drop-target")!;
  function handlerEvent(event: DragEvent): void {
    // 阻止默认行为
    event.preventDefault();

    /** @type {*} 文件的信息字符串 */
    let info: string = "";
    /** @type {*} 显示文件信息的元素 */
    const output: HTMLDivElement = document.querySelector("#app div")!;

    let files: FileList;
    let i: number = 0;
    let len: number = 0;

    if (event.type === "drop") {
      // 在 drop 事件中, 可以通过 event.dataTransfer.files 来读到文件, 次可以用于捕获文件的相关信息
      files = event.dataTransfer?.files!;
      i = 0;
      len = files!.length;

      while (i < len) {
        info += `文件名称: ${files![i].name} (文件类型: ${files[i].type}, 文件大小: ${(
          files[i].size /
          1024 /
          1024
        ).toFixed(2)}mb)<hr/>`;
        i++;
      }
      output.innerHTML = info;
    }
  }

  dropTarget.addEventListener("dragenter", handlerEvent);
  dropTarget.addEventListener("dragover", handlerEvent);
  dropTarget.addEventListener("drop", handlerEvent);
});
