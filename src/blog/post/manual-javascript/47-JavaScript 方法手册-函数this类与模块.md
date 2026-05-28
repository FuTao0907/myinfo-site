---
title: JavaScript 方法手册：函数、this、类与模块
date: 2026/05/19
desc: 系统整理 JavaScript 中函数、this、class、模块系统和相关常用 API，包含典型写法和示例，适合作为查询手册。
tags: ['#JavaScript手册', '#全部', '#JavaScript', '#手册']
cover: https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 3：这篇把函数、this、类和模块化放到一起，方便查常用语言结构。</small>

# 一、函数基础

常见能力：

- 默认参数
- 剩余参数 `...args`
- 解构参数
- 箭头函数
- 返回函数（闭包）

```ts
/**
 * 使用剩余参数计算总和。
 */
function sum(...numbers: number[]) {
  return numbers.reduce((total, item) => total + item, 0)
}
```

# 二、`this` 与显式绑定

规则速查：

- 普通函数：由调用方式决定 `this`
- 对象方法：`this` 指向调用它的对象
- 箭头函数：没有自己的 `this`，继承外层
- `call()` / `apply()` / `bind()`：显式绑定

```ts
const user = {
  name: 'Tom',
  say() {
    return this.name
  },
}

const say = user.say
```

常用方法：

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `call()` | 指定 `this` 并逐个传参 | `fn.call(obj, a, b)` |
| `apply()` | 指定 `this` 并数组传参 | `fn.apply(obj, [a, b])` |
| `bind()` | 返回绑定后新函数 | `fn.bind(obj)` |

# 三、类与继承

## 1. `class`

```ts
/**
 * 定义一个用户类。
 */
class User {
  name: string

  constructor(name: string) {
    this.name = name
  }

  getName() {
    return this.name
  }
}
```

## 2. `extends` 与 `super`

```ts
class Admin extends User {
  role: string

  constructor(name: string, role: string) {
    super(name)
    this.role = role
  }
}
```

## 3. `static`

```ts
class MathTool {
  static add(a: number, b: number) {
    return a + b
  }
}
```

# 四、模块系统

## 1. 命名导出

```ts
export function sum(a: number, b: number) {
  return a + b
}
```

## 2. 默认导出

```ts
export default function createApp() {
  return {}
}
```

## 3. 导入

```ts
import createApp, { sum } from './app'
```

## 4. 动态导入

```ts
/**
 * 按需加载图表模块。
 */
async function loadChart() {
  return import('./chart')
}
```

# 五、闭包与函数工厂

```ts
/**
 * 创建一个带记忆能力的计数器。
 */
function createCounter() {
  let count = 0

  return () => {
    count += 1
    return count
  }
}
```

# 六、注意点

- 箭头函数不适合所有对象方法场景。
- `bind()` 返回新函数，不会立刻执行。
- `class` 是原型继承的语法糖，不是独立继承机制。
- 动态导入适合低频重模块，不适合把所有文件都切碎。
