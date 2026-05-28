---
title: JavaScript 方法手册：Object、Map、Set、WeakMap 与 WeakSet
date: 2026/05/19
desc: 系统整理 JavaScript 中 Object、Map、Set、WeakMap 和 WeakSet 的常见方法、区别与示例，适合作为查询手册。
tags: ['#JavaScript手册', '#全部', '#JavaScript', '#手册']
cover: https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 7：把对象和集合类型集中整理，方便区分场景和方法。</small>

# 一、Object 常用方法

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `Object.keys()` | 取键数组 | `Object.keys(obj)` |
| `Object.values()` | 取值数组 | `Object.values(obj)` |
| `Object.entries()` | 取键值对数组 | `Object.entries(obj)` |
| `Object.assign()` | 合并对象 | `Object.assign({}, a, b)` |
| `Object.hasOwn()` | 是否有自有属性 | `Object.hasOwn(obj, 'id')` |
| `Object.freeze()` | 冻结对象 | `Object.freeze(obj)` |
| `Object.fromEntries()` | 键值对转对象 | `Object.fromEntries(list)` |

```ts
/**
 * 合并两个对象并返回新对象。
 */
function mergeObjects<T extends object, U extends object>(a: T, b: U) {
  return Object.assign({}, a, b)
}
```

# 二、Map

特点：

- 键不限于字符串
- 保持插入顺序
- 适合频繁增删查

常用方法：

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `set()` | 设置键值 | `map.set('a', 1)` |
| `get()` | 获取值 | `map.get('a')` |
| `has()` | 是否存在 | `map.has('a')` |
| `delete()` | 删除键 | `map.delete('a')` |
| `clear()` | 清空 | `map.clear()` |
| `keys()` | 获取键迭代器 | `map.keys()` |
| `values()` | 获取值迭代器 | `map.values()` |
| `entries()` | 获取键值对迭代器 | `map.entries()` |

```ts
const cache = new Map<string, number>()
cache.set('count', 1)
cache.get('count')
```

# 三、Set

特点：

- 值唯一
- 常用于去重和存在性判断

常用方法：

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `add()` | 添加值 | `set.add(1)` |
| `has()` | 是否存在 | `set.has(1)` |
| `delete()` | 删除值 | `set.delete(1)` |
| `clear()` | 清空 | `set.clear()` |
| `values()` | 取值迭代器 | `set.values()` |

```ts
/**
 * 使用 Set 给数组去重。
 */
function uniqueList<T>(list: T[]) {
  return [...new Set(list)]
}
```

# 四、WeakMap

特点：

- 只能用对象作为键
- 键是弱引用，不阻止垃圾回收
- 不能遍历

常用方法：

- `set()`
- `get()`
- `has()`
- `delete()`

```ts
const wm = new WeakMap<object, string>()
const el = {}
wm.set(el, 'cached')
```

# 五、WeakSet

特点：

- 只能存对象
- 成员是弱引用
- 不能遍历

常用方法：

- `add()`
- `has()`
- `delete()`

```ts
const ws = new WeakSet<object>()
const obj = {}
ws.add(obj)
```

# 六、怎么选

- 普通键值对象：优先 `Object`
- 键类型不固定或需要更强集合语义：用 `Map`
- 唯一值集合：用 `Set`
- 想绑定对象私有缓存且不阻止回收：用 `WeakMap`
- 想标记对象集合而不阻止回收：用 `WeakSet`
