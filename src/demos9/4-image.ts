export {};

window.addEventListener("load", (): void => {
  // 基本样式
  const styles = `
  #app {
    justify-content: center;
    align-items: center;
  }
  #app div {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    width: 300px;
    height: 180px;
  }

  #app div .preview {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: scroll no-repeat center linear-gradient(24deg, cyan, purple);
    font-weight: bolder;
    font-size: 18px;
    background-size: cover;
    animation: scroll-bgc 2s linear infinite;
  }

  @keyframes scroll-bgc {
    from {
      filter: hue-rotate(0deg);
    }
    to {
      filter: hue-rotate(360deg);
    }
  }

  #app div img{
    z-index: 3;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  `;

  const styleElement: HTMLStyleElement = document.createElement("style")!;
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);

  // 图片懒加载预览容器
  const imgContainer: HTMLDivElement = document.createElement("div");

  // 预览内容设置
  const previewContent: HTMLDivElement = document.createElement("div");
  previewContent.setAttribute("class", "preview");
  previewContent.textContent = "PLEASE WAIT LOADING...";

  // 真实展示图片设置
  const realImage: HTMLImageElement = new Image();
  // 设置图片懒加载
  realImage.loading = "lazy";
  realImage.src = "https://w.wallhaven.cc/full/57/wallhaven-57l3w3.jpg";
  // 加载失败时触发的回调
  realImage.addEventListener("error", (e: ErrorEvent): void => {
    // 在图片加载失败的时候替换图片
    realImage.src = "/imgs/404.jpg";
    // 假设有兴趣的话可以从失败事件中找点有用信息什么的
    console.log("success: ", e);
  });
  // 加载成功时触发的回调
  realImage.addEventListener("load", (ev: Event): void => {
    // 在加载成功后删除预览内容
    imgContainer.removeChild(previewContent);
    console.log("---", ev);
  });

  const fragment: DocumentFragment = document.createDocumentFragment();
  const app: HTMLElement = document.querySelector("#app")!;

  imgContainer.appendChild(previewContent);
  imgContainer.appendChild(realImage);
  fragment.appendChild(imgContainer);
  app.appendChild(fragment);
});
