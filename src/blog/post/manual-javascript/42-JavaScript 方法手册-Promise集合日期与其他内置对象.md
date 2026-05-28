---
title: JavaScript 方法手册：Promise、集合、日期与其他内置对象
date: 2026/05/19
desc: 逐条整理 JavaScript 中 Promise、Map、Set、Date、Math、JSON、RegExp 等内置对象的常用方法和示例，适合作为查询手册。
tags: ['#JavaScript手册', '#全部', '#JavaScript', '#手册']
cover: https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" width=600 />

<small>分卷 2：聚焦异步、集合、日期、数学、JSON 和正则等内置对象。</small>

# 一、Promise 方法

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `then()` | 成功回调 | `p.then(v => v)` |
| `catch()` | 失败回调 | `p.catch(err => err)` |
| `finally()` | 最终回调 | `p.finally(() => {})` |
| `Promise.resolve()` | 创建已成功 Promise | `Promise.resolve(1)` |
| `Promise.reject()` | 创建已失败 Promise | `Promise.reject('err')` |
| `Promise.all()` | 全部成功才成功 | `Promise.all([a, b])` |
| `Promise.allSettled()` | 等待全部结束 | `Promise.allSettled([a, b])` |
| `Promise.race()` | 取最先结束结果 | `Promise.race([a, b])` |
| `Promise.any()` | 取最先成功结果 | `Promise.any([a, b])` |

```ts
/**
 * 并发请求两个接口并等待都成功。
 */
async function fetchPair() {
  const [user, profile] = await Promise.all([fetch('/api/user'), fetch('/api/profile')])
  return { user, profile }
}
```

# 二、Map 与 Set

## 1. Map

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `set()` | 设置键值 | `map.set('a', 1)` |
| `get()` | 读取值 | `map.get('a')` |
| `has()` | 是否存在 | `map.has('a')` |
| `delete()` | 删除项 | `map.delete('a')` |
| `clear()` | 清空 | `map.clear()` |

## 2. Set

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `add()` | 添加值 | `set.add(1)` |
| `has()` | 是否存在 | `set.has(1)` |
| `delete()` | 删除值 | `set.delete(1)` |
| `clear()` | 清空集合 | `set.clear()` |

```ts
/**
 * 使用 Set 给数组去重。
 */
function uniqueList<T>(list: T[]) {
  return [...new Set(list)]
}
```

# 三、Date 与 Math

## 1. Date

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `getFullYear()` | 年 | `date.getFullYear()` |
| `getMonth()` | 月（0-11） | `date.getMonth()` |
| `getDate()` | 日 | `date.getDate()` |
| `getDay()` | 星期 | `date.getDay()` |
| `getHours()` | 时 | `date.getHours()` |
| `getMinutes()` | 分 | `date.getMinutes()` |
| `getTime()` | 时间戳 | `date.getTime()` |
| `toISOString()` | ISO 字符串 | `date.toISOString()` |

## 2. Math

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `Math.max()` | 最大值 | `Math.max(1, 2)` |
| `Math.min()` | 最小值 | `Math.min(1, 2)` |
| `Math.round()` | 四舍五入 | `Math.round(1.6)` |
| `Math.floor()` | 向下取整 | `Math.floor(1.9)` |
| `Math.ceil()` | 向上取整 | `Math.ceil(1.1)` |
| `Math.abs()` | 绝对值 | `Math.abs(-3)` |
| `Math.random()` | 随机数 | `Math.random()` |

```ts
/**
 * 获取区间随机整数。
 */
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
```

# 四、JSON 与 RegExp

## 1. JSON

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `JSON.stringify()` | 转 JSON 字符串 | `JSON.stringify(obj)` |
| `JSON.parse()` | 解析 JSON 字符串 | `JSON.parse(str)` |

## 2. RegExp

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `test()` | 是否匹配 | `/a/.test('abc')` |
| `exec()` | 获取匹配详情 | `/a/.exec('abc')` |

字符串配合：

- `match()`
- `matchAll()`
- `replace()`
- `search()`

```ts
/**
 * 判断邮箱格式是否正确。
 */
function isEmail(value: string) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)
}
```

# 五、现代常用补充对象

## 1. `URL`

```ts
/**
 * 解析 URL 并读取查询参数。
 */
function readQuery(url: string) {
  const instance = new URL(url)
  return instance.searchParams.get('id')
}
```

## 2. `URLSearchParams`

```ts
const params = new URLSearchParams({ page: '1', size: '10' })
const query = params.toString()
```

## 3. `AbortController`

```ts
/**
 * 创建一个可取消的请求。
 */
async function requestWithAbort() {
  const controller = new AbortController()
  const promise = fetch('/api/list', { signal: controller.signal })
  controller.abort()
  return promise
}
```

## 4. `structuredClone()`

```ts
const copy = structuredClone({ a: 1, list: [1, 2, 3] })
```

# 六、注意点

- `Promise.all()` 只要一个失败就整体失败。
- `Date.getMonth()` 从 `0` 开始，不是从 `1` 开始。
- `Math.random()` 不是密码学安全随机。
- `JSON.stringify()` 会丢失函数、`undefined`、`Symbol`。
