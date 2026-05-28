---
title: JavaScript 方法手册：Promise 全量方法与错误流
date: 2026/05/19
desc: 系统整理 Promise 的实例方法、静态方法、并发工具与错误流处理方式，适合作为异步编程查询手册。
tags: ['#JavaScript手册', '#全部', '#JavaScript', '#手册']
cover: https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" width=600 />

<small>分卷 13：这篇把 Promise 单独拆开，重点整理链式调用、并发工具和错误流。</small>

# 一、Promise 实例方法

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `then()` | 成功回调 | `p.then(v => v)` |
| `catch()` | 失败回调 | `p.catch(err => err)` |
| `finally()` | 最终回调 | `p.finally(() => {})` |

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
| `Promise.reject()` | 创建失败 Promise | `Promise.reject('error')` |
| `Promise.all()` | 全部成功才成功 | `Promise.all([a, b])` |
| `Promise.allSettled()` | 等待全部结束 | `Promise.allSettled([a, b])` |
| `Promise.race()` | 取最先结束结果 | `Promise.race([a, b])` |
| `Promise.any()` | 取最先成功结果 | `Promise.any([a, b])` |

# 三、`Promise.all()` 与 `Promise.allSettled()`

```ts
/**
 * 并发请求并等待全部成功。
 */
async function fetchAll() {
  const [user, posts] = await Promise.all([fetch('/api/user'), fetch('/api/posts')])
  return { user, posts }
}
```

```ts
/**
 * 等待全部请求结束，不管成功还是失败。
 */
async function fetchAllSettled() {
  return Promise.allSettled([fetch('/api/a'), fetch('/api/b')])
}
```

- `all()`：适合所有请求都必须成功的场景。
- `allSettled()`：适合需要收集全部结果的场景。

# 四、错误流

```ts
/**
 * 捕获异步任务错误并返回空值。
 */
async function safeRun<T>(task: () => Promise<T>) {
  try {
    return await task()
  } catch (error) {
    console.error(error)
    return null
  }
}
```

错误传播规律：

- `then()` 中抛错会进入后续 `catch()`
- `await` 抛错可被 `try/catch` 捕获
- `finally()` 不会拿到结果值，但总会执行

# 五、推荐实践

- 用 `await` 提升可读性
- 并发场景优先 `Promise.all()`
- 容错收集结果优先 `Promise.allSettled()`
- 需要最快结果可考虑 `race()` 或 `any()`

# 六、常见误区

- 把所有异步都串行执行
- `Promise.all()` 中一个失败导致整体失败却没预料到
- 在 `catch()` 里静默吞错，导致后续难排查
