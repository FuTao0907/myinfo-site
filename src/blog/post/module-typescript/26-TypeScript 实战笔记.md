---
title: TypeScript 实战笔记
date: 2026/05/19
desc: 按模板方式整理业务开发里最常用的 TypeScript 写法，包括泛型、类型守卫、联合类型收窄和接口响应封装。
tags: ['#TypeScript模块', '#全部', '#TypeScript', '#前端']
cover: https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=2072&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=2072&auto=format&fit=crop" width=600 />

<small>这篇不讲复杂类型体操，只整理业务代码里最常用的 TS 模板。</small>

# 一、泛型函数

```ts
/**
 * 返回数组第一项，返回值类型和入参自动关联。
 */
function first<T>(list: T[]) {
  return list[0]
}
```

- 原理总结：泛型把入参类型带到返回值，避免手写重复类型。
- 注意点：泛型不是为了炫技，能不用复杂就尽量简单。

# 二、类型守卫

```ts
/**
 * 判断值是否为字符串。
 */
function isString(value: unknown): value is string {
  return typeof value === 'string'
}
```

- 原理总结：通过返回 `value is Type` 告诉 TS 后续可以安全收窄。
- 注意点：类型守卫要和实际判断逻辑保持一致。

# 三、联合类型收窄

```ts
type Success = { type: 'success'; data: string[] }
type Failure = { type: 'error'; message: string }

/**
 * 根据判别字段处理不同结构。
 */
function handleResult(result: Success | Failure) {
  if (result.type === 'success') return result.data
  return result.message
}
```

- 原理总结：通过判别字段把联合类型拆成明确分支。
- 注意点：接口建模时尽量主动设计这种判别字段。

# 四、统一响应类型

```ts
type ApiResponse<T> = {
  code: number
  message: string
  data: T
}
```

- 原理总结：把公共结构抽成泛型，减少重复声明。
- 注意点：接口响应一旦统一，前端联调和类型维护都会轻很多。
