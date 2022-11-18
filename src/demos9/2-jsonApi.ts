export {};

const object = {
  name: "counter",
  value: 0,
  increment(): void {
    this.value++;
  },
  tags: [-2, -1, 0, 1, 2],
};

// 默认方式
const str1: string = JSON.stringify(object);
console.log(str1);
// {"name":"counter","value":0,"tags":[-2,-1,0,1,2]}

// 如果第二个参数是数组, 那返回的字符串只会包含指定的 key 的属性
const str2: string = JSON.stringify(object, ["name", "value"]);
console.log(str2);
// {"name":"counter","value":0}

// 如果第二个参数是函数, 那么可以根据 key 对 需要返回的 value 进行相应的处理
const str3: string = JSON.stringify(
  object,
  // 返回的值就是相应 key 应该包含的结果
  (key: string, value: any): any => {
    // 如果是函数类型, 那么就调用 toString() 进行序列化再截取字符串
    if (typeof (<any>object)[key] === "function") {
      const result: string = ((<any>object)[key] as Function).toString();
      // 去除所有的空格和换行, 方便进行还原解析
      return result.substring(key.length, result.length).replaceAll(/\s*/g, "");
    }
    return value;
  }
);
console.log(str3);
// {"name":"counter","value":0,"increment":"(){this.value++;}","tags":[-2,-1,0,1,2]}

// 第三个参数可以用于指定缩进, 默认为0(即不缩进), 最大缩进值为 10, 超出部分会设置截断
// 如果指定了缩进,
const str4: string = JSON.stringify(
  object,
  // 返回的值就是相应 key 应该包含的结果
  (key: string, value: any): any => {
    // 如果是函数类型, 那么就调用 toString() 进行序列化再截取字符串
    if (typeof (<any>object)[key] === "function") {
      const result: string = ((<any>object)[key] as Function).toString();
      // 去除所有的空格和换行, 方便进行还原解析
      return result.substring(key.length, result.length).replaceAll(/\s*/g, "");
    }
    return value;
  },
  4
);
console.log(str4);
/*
{
    "name": "counter",
    "value": 0,
    "increment": "(){this.value++;}",
    "tags": [
        -2,
        -1,
        0,
        1,
        2
    ]
}
*/

const object1 = {
  title: "a tag",
  // 再调用 stringify 方法时, 会基于 toJSON 方法返回适当的 json 表示
  toJSON(): string {
    return this.title.toLocaleUpperCase();
  },
};

console.log(JSON.stringify(object1)); // "A TAG"
