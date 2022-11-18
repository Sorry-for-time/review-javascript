export {};

window.addEventListener("load", (): void => {
  const filesList: HTMLInputElement = document.querySelector("input[type=file]")!;
  filesList.addEventListener("change", (ev: any): void => {
    // 阻止默认动作, 虽然这里好像没必要
    ev.preventDefault();
    const output: HTMLDivElement = document.querySelector("#app > div")!;
    const files: FileList = ev.target.files;
    // window.URL.createObjectURL( File/Blob 对象) 返回的是一个指向内存中地址的字符串
    const url: string = window.URL.createObjectURL(files[0]);
    console.log(`url address is ${url}`);

    if (url) {
      if (/image/.test(files[0].type)) {
        output.innerHTML = `<img src="${url}">`;
      } else if (/video/.test(files[0].type)) {
        output.innerHTML = `<video src="${url}" autoplay muted contextmenu="share" controls></video>`;
      } else {
        output.textContent = `un-know type file.`;
      }
      // 只要 对象 URL 在使用中, 就不能释放内存
      // 可以 window.URL.revokeObjectURL(url) 进行释放资源
      // window.URL.revokeObjectURL(url);
    } else {
      output.textContent = `You browser doesn't not support object URLs`;
    }
  });
});
