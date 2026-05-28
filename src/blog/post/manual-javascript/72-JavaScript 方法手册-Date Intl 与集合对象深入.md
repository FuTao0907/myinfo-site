---
title: JavaScript 方法手册：Date、Intl 与集合对象深入
date: 2026/05/19
desc: 系统整理 JavaScript 中 Date、Intl、Map、Set、WeakMap、WeakSet 的常见方法、适用场景与示例，适合作为查询手册。
tags: ['#JavaScript手册', '#全部', '#JavaScript', '#手册']
cover: https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" width=600 />

<small>分卷 12：把时间、国际化和集合对象进一步细化，便于实际开发时直接查场景。</small>

# 一、Date 常用创建方式

```ts
const now = new Date()
const target = new Date('2026-05-19T12:00:00')
const fromTimestamp = new Date(1_777_000_000_000)
```

# 二、Date 常用方法

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `getFullYear()` | 获取年份 | `date.getFullYear()` |
| `getMonth()` | 获取月份（0-11） | `date.getMonth()` |
| `getDate()` | 获取日期 | `date.getDate()` |
| `getDay()` | 获取星期（0-6） | `date.getDay()` |
| `getHours()` | 获取小时 | `date.getHours()` |
| `getMinutes()` | 获取分钟 | `date.getMinutes()` |
| `getSeconds()` | 获取秒 | `date.getSeconds()` |
| `getTime()` | 获取时间戳 | `date.getTime()` |
| `toISOString()` | ISO 字符串 | `date.toISOString()` |
| `toLocaleString()` | 本地化日期时间 | `date.toLocaleString('zh-CN')` |

# 三、Intl 常用对象

## 1. `Intl.NumberFormat`

```ts
const numberFormatter = new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY',
})
```

## 2. `Intl.DateTimeFormat`

```ts
const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  dateStyle: 'long',
  timeStyle: 'short',
})
```

## 3. `Intl.RelativeTimeFormat`

```ts
const relativeFormatter = new Intl.RelativeTimeFormat('zh-CN', {
  numeric: 'auto',
})
```

- 适用场景：
- 金额格式化
- 日期本地化
- “昨天 / 3 天前 / 2 小时后” 这种相对时间

# 四、Map

```ts
const cache = new Map<string, number>()
cache.set('count', 1)
cache.get('count')
cache.has('count')
cache.delete('count')
```

适用场景：

- 键不是字符串
- 需要保持插入顺序
- 频繁增删查

# 五、Set

```ts
const ids = new Set<number>()
ids.add(1)
ids.add(2)
ids.has(1)
```

适用场景：

- 数组去重
- 快速存在性判断

# 六、WeakMap 与 WeakSet

## 1. `WeakMap`

```ts
const wm = new WeakMap<object, string>()
const el = {}
wm.set(el, 'cached')
```

## 2. `WeakSet`

```ts
const ws = new WeakSet<object>()
const item = {}
ws.add(item)
```

特点：

- 只能存对象
- 弱引用，不阻止垃圾回收
- 不可遍历

# 七、推荐理解方式

- `Date`：时间数据本体
- `Intl`：格式化与本地化工具
- `Map`：更强的键值存储
- `Set`：唯一值集合
- `WeakMap` / `WeakSet`：给对象做弱引用关联

# 八、注意点

- `getMonth()` 从 0 开始，不是从 1 开始。
- `Map` 和 `Set` 可遍历，`WeakMap` 和 `WeakSet` 不可遍历。
- 国际化展示优先 `Intl`，不要手写复杂日期和货币格式。
