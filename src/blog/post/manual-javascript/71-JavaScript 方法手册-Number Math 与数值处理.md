---
title: JavaScript 方法手册：Number、Math 与数值处理
date: 2026/05/19
desc: 系统整理 JavaScript 中与数字处理相关的 Number 和 Math 常用方法、场景与示例，适合作为查询手册。
tags: ['#JavaScript手册', '#全部', '#JavaScript', '#手册']
cover: https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 11：这篇专门整理数值处理相关的 API，方便做金额、随机数、范围和格式化时直接查。</small>

# 一、Number 转换与判断

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `Number()` | 转数字 | `Number('12')` |
| `parseInt()` | 解析整数 | `parseInt('12px', 10)` |
| `parseFloat()` | 解析浮点数 | `parseFloat('12.5px')` |
| `Number.isNaN()` | 是否 NaN | `Number.isNaN(value)` |
| `Number.isFinite()` | 是否有限数 | `Number.isFinite(value)` |

```ts
/**
 * 尝试把输入值转成数字。
 */
function toNumber(value: string) {
  return Number(value)
}
```

# 二、数字格式化

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `toFixed()` | 保留小数位 | `(12.345).toFixed(2)` |
| `toString()` | 转字符串 | `(255).toString(16)` |
| `toLocaleString()` | 本地化格式 | `(1234567).toLocaleString('zh-CN')` |

```ts
/**
 * 格式化价格。
 */
function formatPrice(value: number) {
  return value.toFixed(2)
}
```

# 三、Math 常用方法

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `Math.max()` | 最大值 | `Math.max(1, 2, 3)` |
| `Math.min()` | 最小值 | `Math.min(1, 2, 3)` |
| `Math.round()` | 四舍五入 | `Math.round(1.6)` |
| `Math.floor()` | 向下取整 | `Math.floor(1.9)` |
| `Math.ceil()` | 向上取整 | `Math.ceil(1.1)` |
| `Math.trunc()` | 截断小数部分 | `Math.trunc(1.9)` |
| `Math.abs()` | 绝对值 | `Math.abs(-3)` |
| `Math.sign()` | 取正负号 | `Math.sign(-10)` |
| `Math.pow()` | 幂运算 | `Math.pow(2, 3)` |
| `Math.sqrt()` | 平方根 | `Math.sqrt(9)` |
| `Math.random()` | 随机数 | `Math.random()` |

# 四、随机数模板

```ts
/**
 * 获取指定区间的随机整数。
 */
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
```

# 五、常见处理场景

金额保留两位：

```ts
function toCurrencyText(value: number) {
  return value.toFixed(2)
}
```

限制范围：

```ts
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
```

# 六、注意点

- `parseInt()` 最好显式传基数。
- `toFixed()` 返回字符串，不是数字。
- `Math.random()` 不是安全随机数来源。
- 浮点数计算有精度问题，金额类场景要格外注意。
