/**
 * 定义作业描述
 */
type TASK = {
  /**
   * 任务序列化编号
   */
  serialVersionUID: string;
  /**
   * 任务执行所预估的时间
   */
  needTime: number;
  /**
   * 任务简称
   */
  taskName: string;
  /**
   * 响应比
   */
  rate?: number;
  /**
   * 当前累计耗时
   */
  currentTime?: number;
};

/**
 * 根据响应比队任务进行排序; 公式: 响应比 = (执行任务所需时间+等待时间)/执行任务所需时间
 * @param tasks 原始任务队列
 * @returns 排序完的任务队列
 */
export function sortTasksPrivilege(tasks: Array<TASK>): Array<TASK> {
  // 进行序列化赋值, 切断与原始对象的引用关系
  tasks = JSON.parse(JSON.stringify(tasks));
  // 如果只有一个任务或没有任务的情况
  if (tasks.length <= 1) {
    if (tasks.length === 1) {
      tasks[0].currentTime = tasks[0].needTime;
      tasks[0].rate = 1;
    }
    return tasks;
  }

  const queue: Array<TASK> = [];
  // 统计耗时
  let waitTime: number = 0;
  // 第一次进入先取出时间最短的添加到任务队列
  {
    let max: TASK = tasks[0];
    for (let i: number = 1; i < tasks.length; ++i) {
      if (max.needTime > tasks[i].needTime) {
        max = tasks[i];
      }
    }
    max.rate = 1.0;
    queue.push(max);
    waitTime += max.needTime;
    max.currentTime = waitTime;
  }

  for (let i: number = 0; i < tasks.length; i++) {
    // 过滤掉队列里已经存在的元素
    const leaves: Array<TASK> = tasks.filter((e: TASK): boolean => {
      return !queue.includes(e);
    });
    // 假设第一个元素为响应比最大的
    let max: TASK = leaves[0];
    if (leaves.length >= 2) {
      for (let i: number = 1; i < leaves.length; ++i) {
        const rate1: number = (max.needTime + waitTime) / max.needTime;
        const rate2: number = (leaves[i].needTime + waitTime) / leaves[i].needTime;
        // 比较优先级
        if (rate1 < rate2) {
          // 更新 max
          max = leaves[i];
          // 不要在这里更新响应比, 不要更新源数据
        }
      }

      max.rate = (max.needTime + waitTime) / max.needTime; /* 在外部进行更新取得的最优元素的响应比 */
      // 将取得的高优先级元素添加到队尾
      queue.push(max);
      // 更新等待时间
      waitTime += max.needTime;
    }
    // 如果只剩下一个元素的话直接添加省去比较
    else if (leaves.length === 1) {
      max.rate = (max.needTime + waitTime) / max.needTime;
      queue.push(max);
      waitTime += max.needTime;
    }
    // 设置当前任务完成后已经累计的时间
    queue[queue.length - 1].currentTime = waitTime;
  }

  return queue;
}

/**
 * 定义作业队列
 */
const origin: Array<TASK> = [
  {
    serialVersionUID: crypto.randomUUID().substring(0, 5),
    needTime: 200,
    taskName: "job1",
  },
  {
    serialVersionUID: crypto.randomUUID().substring(0, 5),
    needTime: 100,
    taskName: "job2",
  },
  {
    serialVersionUID: crypto.randomUUID().substring(0, 5),
    needTime: 500,
    taskName: "job3",
  },
  {
    serialVersionUID: crypto.randomUUID().substring(0, 5),
    needTime: 220,
    taskName: "job4",
  },
];

// 进行排序
const results = sortTasksPrivilege(origin);
results.forEach((e: TASK): void => {
  console.log(e);
});
// {serialVersionUID: '78025bef-0ff6-4f01-b3f8-9dd8a978d781', needTime: 100, taskName: 'job2', rate: 1, currentTime: 100}
// {serialVersionUID: '81fbd2ec-62e0-40ed-8d4a-7c0034457193', needTime: 200, taskName: 'job1', rate: 1.5, currentTime: 300}
// {serialVersionUID: 'a69f2287-4b3f-451b-b44f-65ab053a66aa', needTime: 220, taskName: 'job4', rate: 2.3636363636363638, currentTime: 520}
// {serialVersionUID: '84821c01-8a8d-4a17-9c32-19e344c37db4', needTime: 500, taskName: 'job3', rate: 2.04, currentTime: 1020}currentTime: 1020needTime: 500rate: 2.04serialVersionUID: "84821c01-8a8d-4a17-9c32-19e344c37db4"taskName: "job3"[[Prototype]]: Object

const randomClassId = crypto.randomUUID();
const styles = `
table[data-v-${randomClassId}] {
  margin: 10px auto;
  border: 1px solid rgb(167, 167, 167);
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 0 10px wheat;
  background: linear-gradient(23deg, rgb(8, 2, 66), cyan);
  text-shadow: 1px 1px 1px black;
  font-size: 15px;
  text-align: left;
}

table[data-v-${randomClassId}] th  {
  text-decoration: underline;
  text-align: center;
}

table[data-v-${randomClassId}] tbody td  {
  text-align: center;
}

table[data-v-${randomClassId}]:first-child {
  margin-top: 100px;
}

table[data-v-${randomClassId}] tr td {
  padding: 5px;
}
`;

const style = document.createElement("style");
style.textContent = styles;
document.head.appendChild(style);

async function doInsertTable(result: Array<TASK>, tableTitle: string = "A TABLE"): Promise<void> {
  const table: HTMLTableElement = document.createElement("table");
  const thead = document.createElement("thead");
  const theadTr = document.createElement("tr");
  const theTitle = document.createElement("th");
  theTitle.setAttribute("colspan", "5");
  theTitle.textContent = tableTitle;
  const tableMainTilt = document.createElement("tr");
  tableMainTilt.appendChild(theTitle);
  thead.appendChild(tableMainTilt);
  const columnNames: string[] = ["serialVersionUID", "needTime", "taskName", "rate", "currentTime"];
  columnNames.forEach((e) => {
    const th = document.createElement("th");
    th.textContent = e;
    theadTr.appendChild(th);
  });
  thead.appendChild(theadTr);
  table.appendChild(thead);

  const tBody = document.createElement("tbody");
  console.log("-".repeat(50));
  result.forEach((e: TASK): void => {
    const tr = document.createElement("tr");
    console.log(e);

    columnNames.forEach((v: string): void => {
      const td = document.createElement("td");
      td.textContent = JSON.stringify((e as any)[v]);
      tr.appendChild(td);
    });
    tBody.appendChild(tr);
  });
  table.appendChild(tBody);

  table.setAttribute(`data-v-${randomClassId}`, "tag");
  // table.setAttribute("","");
  document.getElementById("app")?.appendChild(table);
}

window.addEventListener("load", async (): Promise<void> => {
  doInsertTable(origin, "原始数据");
  doInsertTable(results, "排列数据");
});
