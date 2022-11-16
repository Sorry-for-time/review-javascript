self.addEventListener("message", ({ data }) => {
  console.log(`worker's buffer size is: ${data.byteLength}`);
});
