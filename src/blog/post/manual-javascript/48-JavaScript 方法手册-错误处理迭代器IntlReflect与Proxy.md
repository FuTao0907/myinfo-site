---
title: JavaScript 方法手册：错误处理、迭代器、Intl、Reflect 与 Proxy
date: 2026/05/19
desc: 系统整理 JavaScript 中错误处理、迭代器、生成器、Intl、Reflect 和 Proxy 等进阶内置能力，包含典型用途和示例，适合作为查询手册。
tags: ['#JavaScript手册', '#全部', '#JavaScript', '#手册']
cover: https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" width=600 />

<small>分卷 4：把 JS 里偏进阶但开发中会遇到的内置能力集中整理。</small>

# 一、错误处理

常见错误类：

- `Error`
- `TypeError`
- `ReferenceError`
- `SyntaxError`
- `RangeError`

```ts
/**
 * 统一执行异步任务并输出错误。
 */
async function safeRun<T>(task: () => Promise<T>) {
  try {
    return await task()
  } catch (error) {
    console.error('task failed:', error)
    return null
  }
}
```

## `try/catch/finally`

```ts
try {
  throw new Error('something wrong')
} catch (error) {
  console.error(error)
} finally {
  console.log('done')
}
```

# 二、迭代器与生成器

## 1. 迭代器协议

支持 `for...of` 的对象通常实现了迭代器协议。

## 2. `function*`

```ts
/**
 * 创建一个简单生成器。
 */
function* createIds() {
  let id = 1
  while (true) {
    yield id
    id += 1
  }
}
```

## 3. `next()`

```ts
const generator = createIds()
generator.next().value
```

# 三、Intl 国际化对象

## 1. `Intl.NumberFormat`

```ts
const formatter = new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY',
})

formatter.format(1234.56)
```

## 2. `Intl.DateTimeFormat`

```ts
const formatter = new Intl.DateTimeFormat('zh-CN', {
  dateStyle: 'long',
  timeStyle: 'short',
})

formatter.format(new Date())
```

## 3. `Intl.RelativeTimeFormat`

```ts
const formatter = new Intl.RelativeTimeFormat('zh-CN', { numeric: 'auto' })
formatter.format(-1, 'day')
```

# 四、Reflect

常见方法：

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `Reflect.get()` | 获取属性 | `Reflect.get(obj, 'name')` |
| `Reflect.set()` | 设置属性 | `Reflect.set(obj, 'name', 'Tom')` |
| `Reflect.has()` | 是否存在属性 | `Reflect.has(obj, 'id')` |
| `Reflect.deleteProperty()` | 删除属性 | `Reflect.deleteProperty(obj, 'a')` |
| `Reflect.ownKeys()` | 获取所有键 | `Reflect.ownKeys(obj)` |
| `Reflect.apply()` | 调用函数 | `Reflect.apply(fn, obj, [1, 2])` |

# 五、Proxy

```ts
/**
 * 代理对象属性读取和写入。
 */
const user = new Proxy(
  { name: 'Tom' },
  {
    get(target, key) {
      console.log('get:', String(key))
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      console.log('set:', String(key), value)
      return Reflect.set(target, key, value)
    },
  }
)
```

- 原理总结：`Proxy` 用来拦截对象行为，`Reflect` 用来执行对应默认操作。
- 注意点：`Proxy` 很强，但滥用会增加调试复杂度。

# 六、其他现代能力

## 1. `optional chaining`

```ts
const name = user?.profile?.name
```

## 2. `nullish coalescing`

```ts
const displayName = name ?? '匿名用户'
```

## 3. `structuredClone()`

```ts
const copy = structuredClone({ a: 1, list: [1, 2, 3] })
```

# 七、注意点

- `for...in` 遍历对象键，`for...of` 遍历可迭代值。
- `Intl` 比手写时间和金额格式化更稳。
- `Proxy` 性能和调试成本都比普通对象高，别滥用。
