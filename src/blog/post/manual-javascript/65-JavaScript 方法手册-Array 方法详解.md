---
title: JavaScript 方法手册：Array 方法详解
date: 2026/05/19
desc: 系统整理 JavaScript 数组常用方法，按是否修改原数组、是否返回新数组、是否用于查找和聚合来分类，适合作为查询手册。
tags: ['#JavaScript手册', '#全部', '#JavaScript', '#手册']
cover: https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 9：把数组方法单独拉出来，按使用目的分类，方便直接查。</small>

# 一、会修改原数组的方法

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `push()` | 末尾添加 | `arr.push(1)` |
| `pop()` | 末尾删除 | `arr.pop()` |
| `shift()` | 头部删除 | `arr.shift()` |
| `unshift()` | 头部添加 | `arr.unshift(1)` |
| `splice()` | 增删改 | `arr.splice(1, 1)` |
| `sort()` | 排序 | `arr.sort((a, b) => a - b)` |
| `reverse()` | 反转 | `arr.reverse()` |

# 二、返回新数组的方法

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `slice()` | 截取子数组 | `arr.slice(0, 2)` |
| `concat()` | 拼接数组 | `a.concat(b)` |
| `map()` | 映射 | `arr.map(x => x * 2)` |
| `filter()` | 过滤 | `arr.filter(Boolean)` |
| `flat()` | 扁平化 | `arr.flat(2)` |
| `flatMap()` | 映射并扁平化 | `arr.flatMap(x => [x, x])` |

# 三、查找与判断

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `includes()` | 是否包含 | `arr.includes(2)` |
| `indexOf()` | 索引位置 | `arr.indexOf(2)` |
| `find()` | 找元素 | `arr.find(x => x.id === 1)` |
| `findIndex()` | 找索引 | `arr.findIndex(x => x > 3)` |
| `some()` | 任一满足 | `arr.some(x => x > 0)` |
| `every()` | 全部满足 | `arr.every(x => x > 0)` |

# 四、遍历与聚合

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `forEach()` | 遍历 | `arr.forEach(console.log)` |
| `reduce()` | 聚合 | `arr.reduce((a, b) => a + b, 0)` |

```ts
/**
 * 使用 reduce 统计数组总和。
 */
function getSum(list: number[]) {
  return list.reduce((total, item) => total + item, 0)
}
```

# 五、新旧方法使用建议

- 只取子数组：用 `slice()`
- 需要改原数组：用 `splice()`
- 做映射：用 `map()`
- 做过滤：用 `filter()`
- 查一个元素：用 `find()`
- 聚合结果：用 `reduce()`

# 六、常见注意点

- `sort()` 默认按字符串排序。
- `map()` 必须有返回值，不然结果会是 `undefined` 数组。
- `forEach()` 不能直接中断循环。
- `reduce()` 初始值最好显式传入。
