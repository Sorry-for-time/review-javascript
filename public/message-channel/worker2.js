const channel = new BroadcastChannel("worker_channel");

channel.addEventListener("message", ({ data }) => {
  console.log(`heard ${data} in worker`);
  channel.postMessage("bar");
});
