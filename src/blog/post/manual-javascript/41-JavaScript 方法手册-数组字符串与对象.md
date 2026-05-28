---
title: JavaScript 方法手册：数组字符串与对象
date: 2026/05/19
desc: 逐条整理 JavaScript 中最常用的 Array、String、Object 方法，包含作用、返回值特点和最小示例，适合作为查询手册。
tags: ['#JavaScript手册', '#全部', '#JavaScript', '#手册']
cover: https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 1：最常用的数组、字符串和对象方法集中整理。</small>

# 一、Array 方法

## 1. 改变原数组的方法

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `push()` | 末尾添加 | `arr.push(1)` |
| `pop()` | 末尾删除 | `arr.pop()` |
| `shift()` | 头部删除 | `arr.shift()` |
| `unshift()` | 头部添加 | `arr.unshift(1)` |
| `splice()` | 增删改 | `arr.splice(1, 1)` |
| `sort()` | 排序 | `arr.sort((a, b) => a - b)` |
| `reverse()` | 反转 | `arr.reverse()` |

## 2. 返回新数组的方法

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `slice()` | 截取 | `arr.slice(0, 2)` |
| `concat()` | 拼接 | `a.concat(b)` |
| `map()` | 映射 | `arr.map(x => x * 2)` |
| `filter()` | 过滤 | `arr.filter(Boolean)` |
| `flat()` | 扁平化 | `arr.flat(2)` |
| `flatMap()` | 映射后扁平化 | `arr.flatMap(x => [x, x])` |

## 3. 查找与判断

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `includes()` | 是否包含 | `arr.includes(2)` |
| `indexOf()` | 查索引 | `arr.indexOf(2)` |
| `find()` | 找元素 | `arr.find(x => x.id === 1)` |
| `findIndex()` | 找索引 | `arr.findIndex(x => x > 3)` |
| `some()` | 任一满足 | `arr.some(x => x > 0)` |
| `every()` | 全部满足 | `arr.every(x => x > 0)` |

## 4. 遍历与聚合

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `forEach()` | 遍历 | `arr.forEach(console.log)` |
| `reduce()` | 聚合 | `arr.reduce((a, b) => a + b, 0)` |

```ts
/**
 * 使用 reduce 计算数组总和。
 */
function getSum(list: number[]) {
  return list.reduce((total, item) => total + item, 0)
}
```

# 二、String 方法

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `trim()` | 去首尾空格 | `str.trim()` |
| `toUpperCase()` | 转大写 | `str.toUpperCase()` |
| `toLowerCase()` | 转小写 | `str.toLowerCase()` |
| `slice()` | 截取 | `str.slice(0, 3)` |
| `substring()` | 子串 | `str.substring(1, 4)` |
| `includes()` | 是否包含 | `str.includes('abc')` |
| `startsWith()` | 开头匹配 | `str.startsWith('http')` |
| `endsWith()` | 结尾匹配 | `str.endsWith('.png')` |
| `replace()` | 替换一次 | `str.replace('a', 'b')` |
| `replaceAll()` | 全部替换 | `str.replaceAll('-', '/')` |
| `split()` | 切分 | `str.split(',')` |
| `padStart()` | 前补齐 | `'7'.padStart(2, '0')` |
| `padEnd()` | 后补齐 | `'a'.padEnd(3, '.')` |
| `repeat()` | 重复 | `'ha'.repeat(3)` |

```ts
/**
 * 把日期字符串中的短横线替换为斜杠。
 */
function formatDateString(value: string) {
  return value.replaceAll('-', '/')
}
```

# 三、Object 常用方法

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `Object.keys()` | 取键数组 | `Object.keys(obj)` |
| `Object.values()` | 取值数组 | `Object.values(obj)` |
| `Object.entries()` | 取键值对数组 | `Object.entries(obj)` |
| `Object.assign()` | 合并对象 | `Object.assign({}, a, b)` |
| `Object.hasOwn()` | 是否有自有属性 | `Object.hasOwn(obj, 'id')` |
| `Object.freeze()` | 冻结对象 | `Object.freeze(obj)` |

```ts
/**
 * 把对象转成键值对数组。
 */
function toEntries<T extends Record<string, unknown>>(value: T) {
  return Object.entries(value)
}
```

# 四、注意点

- `sort()` 默认按字符串排序，数字排序要传比较函数。
- `map()` 会返回新数组，`forEach()` 不会。
- `slice()` 不改原数组，`splice()` 会改原数组。
- 字符串是不可变的，所有处理方法都返回新字符串。
