---
title: JavaScript 方法手册（全量索引版）
date: 2026/05/19
desc: 按手册方式整理 JavaScript 常用内置对象、核心方法和现代语法，包括 Array、String、Object、Map、Set、Date、Math、Promise、JSON、RegExp 和模块系统。
tags: ['#JavaScript手册', '#全部', '#JavaScript', '#前端基础']
cover: https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>手册型写法：按内置对象和方法分类整理，目标是像查 API 文档一样快速定位方法和示例。</small>

# 一、手册边界

- 本文偏“方法索引”，重点是内置对象和常用 API。
- 每组方法以“作用 + 常见方法 + 最小示例”为主。
- 不是完整 ECMAScript 规范全文，但按开发常用能力尽量做全。

# 二、分卷导航

先看总索引，再按对象或主题进入对应分卷：

- 数组、字符串与对象总览：`41`
- Promise、集合、日期与其他内置对象：`42`
- 函数、this、类与模块：`47`
- 错误处理、迭代器、Intl、Reflect、Proxy：`48`
- Number、Math、Date、Intl：`53`
- JSON、RegExp、URL、AbortController：`54`
- Object、Map、Set、WeakMap、WeakSet：`59`
- Promise、迭代器与生成器：`60`
- Array 方法详解：`65`
- String、Object、Reflect、Proxy 详解：`66`
- Number、Math 与数值处理：`71`
- Date、Intl 与集合对象深入：`72`
- Promise 全量方法与错误流：`77`
- RegExp、JSON、URLSearchParams 与模块系统：`78`

# 三、推荐查找路径

- 只想快速找 API 名字：先看这篇
- 查数组、对象、字符串：优先看 `41`、`65`、`66`
- 查异步、Promise、错误流：优先看 `42`、`60`、`77`
- 查正则、JSON、URL 参数处理：优先看 `54`、`78`
- 查时间、数值、国际化：优先看 `53`、`71`、`72`

# 四、基础语法与操作符速查

常见语法点：

- 变量声明：`let` `const` `var`
- 条件：`if` `switch` `?:`
- 循环：`for` `for...of` `while`
- 可选链：`obj?.a?.b`
- 空值合并：`a ?? b`
- 展开：`...arr`
- 解构：`const { a } = obj`

# 五、Array 方法

高频方法：

| 方法          | 作用           | 示例                             |
| ------------- | -------------- | -------------------------------- |
| `push()`      | 末尾添加       | `arr.push(1)`                    |
| `pop()`       | 末尾删除       | `arr.pop()`                      |
| `shift()`     | 头部删除       | `arr.shift()`                    |
| `unshift()`   | 头部添加       | `arr.unshift(1)`                 |
| `slice()`     | 截取新数组     | `arr.slice(0, 2)`                |
| `splice()`    | 增删改原数组   | `arr.splice(1, 1)`               |
| `concat()`    | 拼接数组       | `a.concat(b)`                    |
| `includes()`  | 是否包含       | `arr.includes(2)`                |
| `indexOf()`   | 查索引         | `arr.indexOf(2)`                 |
| `find()`      | 找到首个匹配项 | `arr.find(x => x.id === 1)`      |
| `findIndex()` | 找到索引       | `arr.findIndex(x => x > 10)`     |
| `filter()`    | 过滤           | `arr.filter(Boolean)`            |
| `map()`       | 映射           | `arr.map(x => x * 2)`            |
| `reduce()`    | 聚合           | `arr.reduce((a, b) => a + b, 0)` |
| `some()`      | 任一满足       | `arr.some(x => x > 0)`           |
| `every()`     | 全部满足       | `arr.every(x => x > 0)`          |
| `sort()`      | 排序           | `arr.sort((a, b) => a - b)`      |
| `flat()`      | 扁平化         | `arr.flat(2)`                    |
| `flatMap()`   | 映射并扁平化   | `arr.flatMap(x => [x, x])`       |
| `forEach()`   | 遍历           | `arr.forEach(console.log)`       |

```ts
/**
 * 用 map 把数字翻倍。
 */
function doubleList(list: number[]) {
  return list.map((item) => item * 2)
}
```

# 六、String 方法

| 方法            | 作用         | 示例                       |
| --------------- | ------------ | -------------------------- |
| `length`        | 长度         | `str.length`               |
| `trim()`        | 去首尾空格   | `str.trim()`               |
| `toUpperCase()` | 大写         | `str.toUpperCase()`        |
| `toLowerCase()` | 小写         | `str.toLowerCase()`        |
| `slice()`       | 截取         | `str.slice(0, 3)`          |
| `substring()`   | 子串         | `str.substring(1, 4)`      |
| `includes()`    | 是否包含     | `str.includes('a')`        |
| `startsWith()`  | 是否开头匹配 | `str.startsWith('http')`   |
| `endsWith()`    | 是否结尾匹配 | `str.endsWith('.png')`     |
| `replace()`     | 替换一次     | `str.replace('a', 'b')`    |
| `replaceAll()`  | 全部替换     | `str.replaceAll('-', '/')` |
| `split()`       | 切分数组     | `str.split(',')`           |
| `padStart()`    | 前补齐       | `'7'.padStart(2, '0')`     |
| `padEnd()`      | 后补齐       | `'a'.padEnd(3, '.')`       |
| `repeat()`      | 重复字符串   | `'ha'.repeat(3)`           |

# 七、Number、Math、Date

Number 常用：

- `Number()`
- `parseInt()`
- `parseFloat()`
- `Number.isNaN()`
- `Number.isFinite()`
- `toFixed()`

Math 常用：

- `Math.max()`
- `Math.min()`
- `Math.round()`
- `Math.floor()`
- `Math.ceil()`
- `Math.random()`
- `Math.abs()`

Date 常用：

- `new Date()`
- `getFullYear()`
- `getMonth()`
- `getDate()`
- `getDay()`
- `getHours()`
- `toISOString()`
- `getTime()`

```ts
/**
 * 生成一个指定区间的随机整数。
 */
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
```

# 八、Object、Map、Set

Object 常用：

- `Object.keys()`
- `Object.values()`
- `Object.entries()`
- `Object.assign()`
- `Object.hasOwn()`

Map 常用：

- `set()`
- `get()`
- `has()`
- `delete()`
- `clear()`

Set 常用：

- `add()`
- `has()`
- `delete()`
- `clear()`

```ts
/**
 * 使用 Set 给数组去重。
 */
function uniqueList<T>(list: T[]) {
  return [...new Set(list)]
}
```

# 九、JSON 与 RegExp

JSON：

- `JSON.stringify()`
- `JSON.parse()`

RegExp：

- `test()`
- `exec()`

字符串配合正则：

- `match()`
- `matchAll()`
- `replace()`
- `search()`

```ts
/**
 * 判断字符串是否为邮箱格式。
 */
function isEmail(value: string) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)
}
```

# 十、Promise 与异步

Promise 常用：

- `then()`
- `catch()`
- `finally()`
- `Promise.resolve()`
- `Promise.reject()`
- `Promise.all()`
- `Promise.allSettled()`
- `Promise.race()`
- `Promise.any()`

```ts
/**
 * 并发请求两个接口。
 */
async function fetchAll() {
  const [user, projects] = await Promise.all([fetch('/api/user'), fetch('/api/projects')])
  return { user, projects }
}
```

# 十一、函数、this 与类

函数相关：

- 普通函数
- 箭头函数
- 默认参数
- 剩余参数 `...args`
- 解构参数

`this` 常见规则：

- 普通函数：取决于调用方式
- 对象方法：指向调用它的对象
- 箭头函数：没有自己的 `this`，继承外层
- `call()` / `apply()` / `bind()`：显式绑定

类相关：

- `class`
- `constructor`
- `extends`
- `super`
- `static`
- getter / setter

# 十二、模块系统

静态导入：

```ts
import { sum } from './math'
```

动态导入：

```ts
/**
 * 按需加载模块。
 */
async function loadModule() {
  return import('./heavy-module.js')
}
```

# 十三、错误处理与现代补充

错误相关：

- `try/catch/finally`
- `throw new Error()`
- `Error`
- `TypeError`
- `SyntaxError`

现代补充：

- `optional chaining`：`obj?.a`
- `nullish coalescing`：`a ?? b`
- `Intl`：国际化格式化
- `URL` / `URLSearchParams`
- `AbortController`
- `structuredClone()`

```ts
/**
 * 安全读取用户昵称，没有时返回默认值。
 */
function getUserName(user?: { profile?: { name?: string } }) {
  return user?.profile?.name ?? '匿名用户'
}
```
