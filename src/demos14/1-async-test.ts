export {};

setTimeout((): void => {
  console.log("A");
});

Promise.resolve("B").then((res: string): void => {
  console.log(res);
});

async function fn1(): Promise<string> {
  console.log("C");
  return "D";
}

async function fn2(): Promise<void> {
  console.log("E");
  console.log(await fn1());
  Promise.resolve(null).then(() => {
    setTimeout(async () => {
      console.log("F");
    });
  });
}

fn2();
console.log("G");
// E C G B D A F
