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

## what is this

> Let the asynchronous queue respond to the results in the order in which it was requested. 

## use examples
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

// Results of the
// [[null, '1']], false
// [[null, '2'],[null, '3'],[null, '4']], false
// [[null, '5'],[null, '5']], true
```

## API

| function | description | parameter |
|:--------:|:--------:|:--------:|
| `add` | Add Promise to the queue | Promise | [Promsie] |
| `call` | Handle the response in the Promise column of the team | [[error, data]] The returned promise array, each item is an array containing error and data, error is null by default, if error exists, it means that the promise request reported an error |

## Build a development environment

```shell
1. Fork project, then clone to local.
git clone git@github.com:txs1992/priority-promise-queue.git

2. Installation dependencies (make sure your computer has Node.js installed)
yarn install

3. run the project
yarn serve
```


## License

MIT
