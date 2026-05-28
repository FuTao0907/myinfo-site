---
title: JavaScript 方法手册：Number、Math、Date 与 Intl
date: 2026/05/19
desc: 系统整理 JavaScript 中 Number、Math、Date 和 Intl 相关方法，包含常见用途、返回值说明和示例，适合作为查询手册。
tags: ['#JavaScript手册', '#全部', '#JavaScript', '#手册']
cover: https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 5：把和数值、时间、数学、国际化格式化相关的方法集中到一篇里。</small>

# 一、Number 相关

| 方法/属性 | 作用 | 示例 |
| --- | --- | --- |
| `Number()` | 转数字 | `Number('12')` |
| `parseInt()` | 转整数 | `parseInt('12px', 10)` |
| `parseFloat()` | 转浮点数 | `parseFloat('12.5px')` |
| `Number.isNaN()` | 是否 NaN | `Number.isNaN(value)` |
| `Number.isFinite()` | 是否有限数 | `Number.isFinite(value)` |
| `toFixed()` | 保留小数位 | `(12.345).toFixed(2)` |
| `toString()` | 转字符串 | `(255).toString(16)` |

```ts
/**
 * 保留两位小数并返回字符串。
 */
function formatPrice(value: number) {
  return value.toFixed(2)
}
```

# 二、Math 常用方法

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `Math.max()` | 最大值 | `Math.max(1, 2, 3)` |
| `Math.min()` | 最小值 | `Math.min(1, 2, 3)` |
| `Math.round()` | 四舍五入 | `Math.round(1.6)` |
| `Math.floor()` | 向下取整 | `Math.floor(1.9)` |
| `Math.ceil()` | 向上取整 | `Math.ceil(1.1)` |
| `Math.abs()` | 绝对值 | `Math.abs(-3)` |
| `Math.random()` | 随机数 | `Math.random()` |
| `Math.pow()` | 幂运算 | `Math.pow(2, 3)` |
| `Math.sqrt()` | 开平方 | `Math.sqrt(9)` |

```ts
/**
 * 获取指定区间的随机整数。
 */
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
```

# 三、Date 常用方法

创建日期：

```ts
const now = new Date()
const target = new Date('2026-05-19T12:00:00')
```

常见方法：

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `getFullYear()` | 年 | `date.getFullYear()` |
| `getMonth()` | 月（0-11） | `date.getMonth()` |
| `getDate()` | 日 | `date.getDate()` |
| `getDay()` | 星期（0-6） | `date.getDay()` |
| `getHours()` | 时 | `date.getHours()` |
| `getMinutes()` | 分 | `date.getMinutes()` |
| `getSeconds()` | 秒 | `date.getSeconds()` |
| `getTime()` | 时间戳 | `date.getTime()` |
| `toISOString()` | ISO 字符串 | `date.toISOString()` |
| `toLocaleString()` | 本地化字符串 | `date.toLocaleString()` |

```ts
/**
 * 获取当前时间戳。
 */
function getTimestamp() {
  return Date.now()
}
```

# 四、Intl 国际化格式化

## 1. `Intl.NumberFormat`

```ts
const numberFormatter = new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY',
})

numberFormatter.format(12345.67)
```

## 2. `Intl.DateTimeFormat`

```ts
const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  dateStyle: 'long',
  timeStyle: 'short',
})

dateFormatter.format(new Date())
```

## 3. `Intl.RelativeTimeFormat`

```ts
const relativeFormatter = new Intl.RelativeTimeFormat('zh-CN', {
  numeric: 'auto',
})

relativeFormatter.format(-1, 'day')
```

# 五、注意点

- `getMonth()` 从 `0` 开始。
- `Math.random()` 不是密码学安全随机。
- `toFixed()` 返回字符串，不是数字。
- 国际化场景优先 `Intl`，不要手写货币和日期格式。
