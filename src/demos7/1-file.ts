export {};

window.addEventListener("load", (): void => {
  const filesList: HTMLInputElement = document.querySelector("input[type=file]")!;
  filesList.addEventListener("change", (ev: Event): void => {
    // 阻止默认动作, 虽然这里好像没必要
    ev.preventDefault();

    const event = <any>ev;
    const files = event.target.files as FileList;
    const length: number = files.length;
    let i: number = 0;
    while (i < length) {
      // 获取表单选中文件
      const f: File = files[i];
      console.log(`${f.name}, ${f.type}, ${f.size} byte size, 最后修改时间: ${f.lastModified} `);
      i++;
    }
  });
});
