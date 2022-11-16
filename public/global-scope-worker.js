console.log("inside worker:", self);

self.addEventListener("message", (data) => {
  console.log(data.data);
  self.postMessage(self.name + ": " + data.data);
});
