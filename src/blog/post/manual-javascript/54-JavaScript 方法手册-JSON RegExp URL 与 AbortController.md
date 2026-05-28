---
title: JavaScript 方法手册：JSON、RegExp、URL 与 AbortController
date: 2026/05/19
desc: 系统整理 JavaScript 中 JSON、RegExp、URL、URLSearchParams 和 AbortController 的常见方法与示例，适合作为查询手册。
tags: ['#JavaScript手册', '#全部', '#JavaScript', '#手册']
cover: https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" width=600 />

<small>分卷 6：聚焦数据序列化、正则匹配、URL 处理和请求取消等非常高频的现代 API。</small>

# 一、JSON

| 方法               | 作用             | 示例                  |
| ------------------ | ---------------- | --------------------- |
| `JSON.stringify()` | 转 JSON 字符串   | `JSON.stringify(obj)` |
| `JSON.parse()`     | 解析 JSON 字符串 | `JSON.parse(str)`     |

```ts
/**
 * 把对象序列化为 JSON 字符串。
 */
function toJSON(value: unknown) {
  return JSON.stringify(value)
}
```

注意点：

- `JSON.stringify()` 会忽略 `undefined`、函数、`Symbol`
- 循环引用对象不能直接 stringify

# 二、RegExp 与字符串匹配

## 1. `test()`

```ts
const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test('test@example.com')
```

## 2. `exec()`

```ts
const match = /\d+/.exec('abc123')
```

## 3. 字符串配合正则的方法

| 方法         | 作用         | 示例                          |
| ------------ | ------------ | ----------------------------- |
| `match()`    | 获取匹配结果 | `'abc123'.match(/\d+/)`       |
| `matchAll()` | 获取全部匹配 | `'a1b2'.matchAll(/\d/g)`      |
| `replace()`  | 替换匹配     | `'2026-05'.replace('-', '/')` |
| `search()`   | 查找位置     | `'abc123'.search(/\d+/)`      |

```ts
/**
 * 判断输入是否为手机号格式。
 */
function isPhone(value: string) {
  return /^1\d{10}$/.test(value)
}
```

# 三、URL

## 1. `URL`

```ts
/**
 * 解析 URL 并读取基础信息。
 */
function parseURL(value: string) {
  const url = new URL(value)

  return {
    protocol: url.protocol,
    host: url.host,
    pathname: url.pathname,
    search: url.search,
  }
}
```

## 2. `URLSearchParams`

```ts
const params = new URLSearchParams({ page: '1', size: '10' })
params.get('page')
params.set('page', '2')
params.toString()
```

常见方法：

- `get()`
- `set()`
- `append()`
- `delete()`
- `has()`
- `toString()`

# 四、AbortController

```ts
/**
 * 创建一个可取消的请求。
 */
async function requestWithAbort() {
  const controller = new AbortController()
  const request = fetch('/api/list', {
    signal: controller.signal,
  })

  controller.abort()
  return request
}
```

- 作用：中断 `fetch` 等支持 `AbortSignal` 的异步操作。
- 常见场景：
- 搜索联想时取消旧请求
- 页面卸载时中断未完成请求
- 超时控制

# 五、组合示例

```ts
/**
 * 构造 URL，并发起一个支持取消的请求。
 */
function createSearchRequest(keyword: string) {
  const controller = new AbortController()
  const url = new URL('/api/search', window.location.origin)
  url.searchParams.set('keyword', keyword)

  const promise = fetch(url.toString(), {
    signal: controller.signal,
  })

  return {
    controller,
    promise,
  }
}
```

# 六、注意点

- 正则要区分是否需要全局标记 `g`。
- `URL` 解析相对路径时要提供基准地址。
- `AbortController` 中断后会抛出中止错误，记得在调用处区分处理。
