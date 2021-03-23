<h1 align="center">priority-async-queue</h1>

<p align="center">
  <a href="http://img.shields.io/travis/txs1992/priority-async-queue.svg">
    <img src="http://img.shields.io/travis/txs1992/priority-async-queue.svg" />
  </a>
  <a href="https://img.shields.io/npm/dt/priority-async-queue.svg">
    <img src="https://img.shields.io/npm/dt/priority-async-queue.svg" />
  </a>
  <a href="https://img.shields.io/npm/dm/priority-async-queue.svg">
    <img src="https://img.shields.io/npm/dm/priority-async-queue.svg" />
  </a>
  <a href="https://img.shields.io/npm/v/priority-async-queue.svg">
    <img src="https://img.shields.io/npm/v/priority-async-queue.svg" />
  </a>
  <a href="https://img.shields.io/npm/l/priority-async-queue.svg">
    <img src="https://img.shields.io/npm/l/priority-async-queue.svg" />
  </a>
  <a href="https://img.shields.io/node/v/passport.svg">
    <img src="https://img.shields.io/node/v/passport.svg" />
  </a>
</p>

<div align="center">
  <h3>
    <a href="https://github.com/txs1992/priority-async-queue#readme">
      English
    </a>
    <span> | </span>
    <a href="https://github.com/txs1992/priority-async-queue/blob/master/docs/zh-cn.md#readme">
      中文
    </a>
  </h3>
</div>

## 为什么要造这个轮子

> 在公司的一次小组分享会上，[组长](https://github.com/coolzjy) 给我们分享了一个他在项目中遇到的一个问题。在一个嵌入 Iframe 的系统中，当我们点击 Dropdown 展开后，再去点击 Iframe 发现无法触发 Dropdown 的 clickOutside 事件，导致 Dropdown 无法收起。[查看示例](https://jsfiddle.net/_MT_/wLkgu614/29/)
>
> 关于 Iframe 为什么不能触发 clickOutside 请阅读这篇文章 [如何优雅解决 Iframe 无法触发 clickOutside](https://txs1992.github.io/mt-blog/blog/click-outside.html)

## API

| 函数 | 说明 | 参数 |
|:--------:|:--------:|:--------:|
| `bind ` | 为指定元素绑定一个回调函数，当元素失去焦点时触发绑定的回调函数 | `el`，`callback `，`key`， `className`，相关参数的的描述见下面的 `bind 函数 API` |
| `unbind` | 取消元素绑定的函数 | `el`：元素节点 |

## bind 函数 API

| 参数 | 类型 | 说明 | 必选 | 默认值 |
|:--------:|:--------:|:--------:|:--------:|:--------:|
| `el` | Element | 需要被绑定的 DOM 元素 | true | - |
| `callback` | Function  | 绑定元素触发 outside 事件时执行的处理函数 | true | - |
| `key` | String/Function | 将需要绑定的元素或者函数进行分组，同一组元素互相点击不会触发 outside 事件，点击这一组元素之外的元素则会触发 outside 事件。| false | `callback` function |
| `className` | String  | 给元素绑定的自定义类名 | false | "priority-async-queue" |

## 使用 FocusOutside

```js
// import { bind, unbidn } from 'priority-async-queue'
// 建议使用下面这种别名，防止和你的函数命名冲突了。
import { bind: focusBind, unbind: focusUnbind } from 'priority-async-queue'

// 如果你是使用 CDN 引入的，应该这样使用。
// <script src="https://unpkg.com/priority-async-queue@0.5.2/lib/index.js"></script>
// const { bind: focusBind, unbind: focusUnbind } = FocusOutside

const elm = document.querySelector('#dorpdown-button')
// 绑定函数
focusBind(elm, callback)

function callback () {
  console.log('您点击了 dropdown 按钮外面的区域')
  // 清除绑定
  focusUnbind(elm)
}
```


## 搭建开发环境

```shell
1. fork 项目，然后 clone 到本地
git clone git@github.com:txs1992/priority-async-queue.git

2. 安装依赖(请确保您的电脑安装了 Node.js)
npm install
```

## License

MIT
