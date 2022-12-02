export {};

setTimeout((): void => {
  console.log("A");
  Promise.resolve("B").then(console.log);
  console.log("C");
});

function fn1(): void {
  setTimeout(console.log, 0, "D");
  fn2().then(console.log);
}

async function fn2() {
  console.log("E");
  return "F";
}

fn1();
console.log("G");

// E G F A C B D
