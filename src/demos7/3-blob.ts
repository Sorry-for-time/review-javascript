export {};

window.addEventListener("load", (): void => {
  const filesList: HTMLInputElement = document.querySelector("input[type=file]")!;
  filesList.addEventListener("change", (ev: any): void => {
    // 阻止默认动作, 虽然这里好像没必要
    ev.preventDefault();
    const output: HTMLDivElement = document.querySelector("#app > div")!;
    const files: FileList = ev.target.files;
    const reader: FileReader = new FileReader();
    // 只读取前32个字节
    // File 对象提供了一个名为 slice(start, end) 的方法, 用于读取指定的起始到结束的字节数, 返回一个 Blob 对象
    const file: File = files[0];
    const blob: Blob = file.slice(0, 32);
    if (blob) {
      reader.readAsText(blob);
      reader.onerror = (): void => {
        output.innerHTML = `Could not read file, error code is ${reader.error?.code}`;
      };
      reader.onload = (): void => {
        output.innerHTML = reader.result as string;
      };
    } else {
      console.log(`You browser doesn't not support slice().`);
    }
  });
});
