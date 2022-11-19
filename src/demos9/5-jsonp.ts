export {};

function handleResponse(response: any): void {
  console.log(response);
}

window.addEventListener("load", (): void => {
  // 页面在接受到响应之后因该调用的函数
  const script: HTMLScriptElement = document.createElement("script");
  script.src = "/api/text";
  document.body.appendChild(script);
});
