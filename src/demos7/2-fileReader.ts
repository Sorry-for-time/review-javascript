export {};

window.addEventListener("load", async (): Promise<void> => {
  const filesList: HTMLInputElement = document.querySelector("input[type=file]")!;
  filesList.addEventListener("change", (ev: any): void => {
    // 阻止默认动作, 虽然这里好像没必要
    ev.preventDefault();
    const output: HTMLDivElement = document.querySelector("#app > div")!;
    const progress: HTMLElement = document.querySelector("#app > span > code")!;
    const files: FileList = ev.target.files;
    let type: string = "default";
    const reader: FileReader = new FileReader();
    console.log(files[0].type);

    if (/image/.test(files[0].type)) {
      reader.readAsDataURL(files[0]);
      type = "image";
    } else if (/video/.test(files[0].type)) {
      reader.readAsDataURL(files[0]);
      type = "video";
    } else {
      reader.readAsText(files[0]);
      type = "text";
    }

    reader.onerror = (): void => {
      output.innerHTML = `could not read file, error code is ${reader.error?.code}`;
    };

    reader.onprogress = (pv: ProgressEvent<FileReader>): void => {
      if (pv.lengthComputable) {
        progress.textContent = `${(pv.loaded / pv.total) * 100}%`;
      }
    };

    reader.onload = (): void => {
      let html: string = "";
      switch (type) {
        case "image":
          html = `<img src="${reader.result}" alt="图片加载中...">`;
          break;
        case "video":
          html = `<video src="${reader.result}" autoplay muted contextmenu="share" controls></video>`;
          break;
        case "text":
          html = reader.result as string;
          break;
      }
      output.innerHTML = html;
    };
  });
});
