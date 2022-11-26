export {};

let enabled: boolean = true;

function costlyOperation(): void {
  console.log("Invoked at", Date.now());
}

window.addEventListener("load", (): void => {
  window.addEventListener("wheel", (): void => {
    if (enabled) {
      enabled = false;
      window.requestAnimationFrame(costlyOperation);
      window.setTimeout((): void => {
        enabled = true;
      }, 2000);
    }
  });
});
