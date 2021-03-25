<h1 align="center">priority-promise-queue</h1>

<p align="center">
  <a href="http://img.shields.io/travis/txs1992/priority-promise-queue.svg">
    <img src="http://img.shields.io/travis/txs1992/priority-promise-queue.svg" />
  </a>
  <a href="https://img.shields.io/npm/dt/priority-promise-queue.svg">
    <img src="https://img.shields.io/npm/dt/priority-promise-queue.svg" />
  </a>
  <a href="https://img.shields.io/npm/dm/priority-promise-queue.svg">
    <img src="https://img.shields.io/npm/dm/priority-promise-queue.svg" />
  </a>
  <a href="https://img.shields.io/npm/v/priority-promise-queue.svg">
    <img src="https://img.shields.io/npm/v/priority-promise-queue.svg" />
  </a>
  <a href="https://img.shields.io/npm/l/priority-promise-queue.svg">
    <img src="https://img.shields.io/npm/l/priority-promise-queue.svg" />
  </a>
  <a href="https://img.shields.io/node/v/passport.svg">
    <img src="https://img.shields.io/node/v/passport.svg" />
  </a>
</p>

<div align="center">
  <h3>
    <a href="https://github.com/txs1992/priority-promise-queue#readme">
      English
    </a>
    <span> | </span>
    <a href="https://github.com/txs1992/priority-promise-queue/blob/master/docs/zh-cn.md#readme">
      中文
    </a>
  </h3>
</div>

> 让 Promise 的队列按照指定的请求顺序返回响应结果。

## 使用 PriorityPromiseQueue
```ts
import PriorityPromiseQueue from 'priority-promise-queue'

const ppq = new PriorityPromiseQueue()

ppq.add(new Promise((resolve: any) => resolve('1')))
ppq.add(new Promise((resolve: any) => setTimeout(() => resolve('2'), 100)))
ppq.add(new Promise((resolve: any) => setTimeout(() => resolve('3'), 10)))
ppq.add(new Promise((resolve: any) => resolve('4')))
ppq.add([
  new Promise((resolve: any) => setTimeout(() => resolve('5'), 300)),
  new Promise((resolve: any) => resolve('6')),
])

ppq.call((result: any[], done: boolean) => {
  result.forEach((item: any[]) => {
    const [err, data] = item;
    if (!err && data) {
      // do something...
    }
  })

  if (done) {
    // end...
  }
})

// 执行结果  
// [[null, '1']], false
// [[null, '2'],[null, '3'],[null, '4']], false
// [[null, '5'],[null, '5']], true
```

## API

| 函数 | 说明 | 参数 |
|:--------:|:--------:|:--------:|
| `add` | 将 Promise 加入到队列中 | Promise | [Promsie] |
| `call` | 处理队 Promise 列中的响应 | [[error, data]] 返回的承诺数组，每个子项都是包含了 error 和 data 的数组，error 默认是 null，如果 error 存在则表示该 promise 的请求报错了 |

## 搭建开发环境

```shell
1. fork 项目，然后 clone 到本地
git clone git@github.com:txs1992/priority-promise-queue.git

2. 安装依赖(请确保您的电脑安装了 Node.js)
yarn

3. 运行
yarn serve
```

## License

MIT
