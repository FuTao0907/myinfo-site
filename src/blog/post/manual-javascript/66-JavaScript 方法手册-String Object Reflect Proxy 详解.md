---
title: JavaScript 方法手册：String、Object、Reflect、Proxy 详解
date: 2026/05/19
desc: 系统整理 JavaScript 中 String、Object、Reflect 和 Proxy 的高频方法与典型用法，适合作为查询手册。
tags: ['#JavaScript手册', '#全部', '#JavaScript', '#手册']
cover: https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" width=600 />

<small>分卷 10：把字符串、对象反射和代理能力放到一起，补齐常用查询入口。</small>

# 一、String 常用方法

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
| `split()` | 切分数组 | `str.split(',')` |
| `padStart()` | 前补齐 | `'7'.padStart(2, '0')` |
| `padEnd()` | 后补齐 | `'a'.padEnd(3, '.')` |
| `repeat()` | 重复 | `'ha'.repeat(3)` |

```ts
/**
 * 格式化日期字符串分隔符。
 */
function normalizeDateText(value: string) {
  return value.replaceAll('-', '/')
}
```

# 二、Object 常用方法

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `Object.keys()` | 取键数组 | `Object.keys(obj)` |
| `Object.values()` | 取值数组 | `Object.values(obj)` |
| `Object.entries()` | 取键值对数组 | `Object.entries(obj)` |
| `Object.fromEntries()` | 键值对转对象 | `Object.fromEntries(list)` |
| `Object.assign()` | 合并对象 | `Object.assign({}, a, b)` |
| `Object.hasOwn()` | 自有属性判断 | `Object.hasOwn(obj, 'id')` |
| `Object.freeze()` | 冻结对象 | `Object.freeze(obj)` |

# 三、Reflect

| 方法 | 作用 | 示例 |
| --- | --- | --- |
| `Reflect.get()` | 获取属性 | `Reflect.get(obj, 'name')` |
| `Reflect.set()` | 设置属性 | `Reflect.set(obj, 'name', 'Tom')` |
| `Reflect.has()` | 判断属性是否存在 | `Reflect.has(obj, 'id')` |
| `Reflect.deleteProperty()` | 删除属性 | `Reflect.deleteProperty(obj, 'a')` |
| `Reflect.ownKeys()` | 获取所有键 | `Reflect.ownKeys(obj)` |
| `Reflect.apply()` | 调用函数 | `Reflect.apply(fn, obj, [1, 2])` |

# 四、Proxy

```ts
/**
 * 代理对象属性访问。
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

常见拦截：

- `get`
- `set`
- `has`
- `deleteProperty`
- `ownKeys`
- `apply`
- `construct`

# 五、推荐理解方式

- `String`：文本处理工具箱
- `Object`：普通对象操作入口
- `Reflect`：对象底层行为的标准化方法集
- `Proxy`：拦截对象行为的代理层

# 六、常见注意点

- `replace()` 只替换第一个匹配，想全替换优先 `replaceAll()`。
- `Object.assign()` 是浅拷贝，不是深拷贝。
- `Proxy` 很强，但会增加调试难度和一定性能成本。
- `Reflect` 常和 `Proxy` 一起使用，负责执行默认行为。
