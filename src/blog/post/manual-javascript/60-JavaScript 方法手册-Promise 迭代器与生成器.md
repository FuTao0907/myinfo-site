---
title: JavaScript 方法手册：Promise、迭代器与生成器
date: 2026/05/19
desc: 系统整理 JavaScript 中 Promise 的常见方法、并发工具、迭代器协议和生成器的基础用法，适合作为查询手册。
tags: ['#JavaScript手册', '#全部', '#JavaScript', '#手册']
cover: https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" width=600 />

<small>分卷 8：这篇把异步基础和迭代能力集中整理，方便查 Promise 和生成器相关写法。</small>

# 一、Promise 实例方法

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `then()` | 成功回调 | `p.then(v => v)` |
| `catch()` | 失败回调 | `p.catch(err => err)` |
| `finally()` | 结束回调 | `p.finally(() => {})` |

```ts
fetch('/api/user')
  .then((response) => response.json())
  .catch((error) => console.error(error))
  .finally(() => console.log('done'))
```

# 二、Promise 静态方法

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `Promise.resolve()` | 创建成功 Promise | `Promise.resolve(1)` |
| `Promise.reject()` | 创建失败 Promise | `Promise.reject('err')` |
| `Promise.all()` | 全部成功才成功 | `Promise.all([a, b])` |
| `Promise.allSettled()` | 等待全部结束 | `Promise.allSettled([a, b])` |
| `Promise.race()` | 取最先结束结果 | `Promise.race([a, b])` |
| `Promise.any()` | 取最先成功结果 | `Promise.any([a, b])` |

```ts
/**
 * 并发请求并等待全部成功。
 */
async function fetchAll() {
  const [user, projects] = await Promise.all([fetch('/api/user'), fetch('/api/projects')])
  return { user, projects }
}
```

# 三、`async/await`

```ts
/**
 * 使用 async/await 获取 JSON。
 */
async function fetchUser() {
  const response = await fetch('/api/user')
  if (!response.ok) throw new Error(`request failed: ${response.status}`)
  return response.json()
}
```

- 原理总结：`await` 让异步流程更像同步代码。
- 注意点：`await` 只能在 `async` 函数或模块顶层使用。

# 四、迭代器协议

可被 `for...of` 遍历的对象通常实现了迭代器协议。

核心：

- `Symbol.iterator`
- `next()`

```ts
const list = [1, 2, 3]
const iterator = list[Symbol.iterator]()
iterator.next()
```

# 五、生成器 `function*`

```ts
/**
 * 生成一个自增 ID 序列。
 */
function* createIds() {
  let id = 1
  while (true) {
    yield id
    id += 1
  }
}
```

使用：

```ts
const generator = createIds()
generator.next().value
generator.next().value
```

# 六、`for...of` 与 `for await...of`

## 1. `for...of`

```ts
for (const item of [1, 2, 3]) {
  console.log(item)
}
```

## 2. `for await...of`

```ts
async function run(tasks: Array<Promise<number>>) {
  for await (const value of tasks) {
    console.log(value)
  }
}
```

# 七、常见注意点

- `Promise.all()` 任一失败就整体失败。
- `Promise.allSettled()` 更适合“全部都要看结果”的场景。
- `for...in` 遍历键，`for...of` 遍历值。
- 生成器适合可暂停、可恢复的序列逻辑，不适合所有函数都改写。
