---
title: JavaScript 方法手册：RegExp、JSON、URLSearchParams 与模块系统
date: 2026/05/19
desc: 系统整理正则表达式、JSON 读写、URLSearchParams 参数处理与 import/export 模块系统，适合作为日常开发查询手册。
tags: ['#JavaScript手册', '#全部', '#JavaScript', '#手册']
cover: https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" width=600 />

<small>分卷 14：这篇把正则、JSON、查询参数和模块系统放在一起，补齐前端开发里非常高频的基础工具能力。</small>

# 一、RegExp 基础创建方式

```ts
const reg1 = /hello/i
const reg2 = new RegExp('hello', 'i')
```

常见标志位：

| 标志 | 作用            |
| ---- | --------------- |
| `g`  | 全局匹配        |
| `i`  | 忽略大小写      |
| `m`  | 多行模式        |
| `s`  | 让 `.` 匹配换行 |
| `u`  | Unicode 模式    |
| `y`  | 粘连匹配        |

# 二、RegExp 常用方法

| 方法     | 作用         | 示例                 |
| -------- | ------------ | -------------------- |
| `test()` | 判断是否匹配 | `/\d+/.test('123')`  |
| `exec()` | 获取匹配详情 | `/\d+/.exec('a123')` |

```ts
/**
 * 判断文本里是否包含数字。
 */
function hasNumber(text: string) {
  // test 会返回布尔值，适合做格式校验和条件判断。
  return /\d/.test(text)
}
```

```ts
/**
 * 提取文本中的第一个数字片段。
 */
function pickFirstNumber(text: string) {
  // exec 会返回匹配结果数组，能拿到完整匹配和捕获组。
  const match = /\d+/.exec(text)
  return match ? match[0] : ''
}
```

# 三、字符串配合正则的方法

| 方法           | 作用               | 示例                         |
| -------------- | ------------------ | ---------------------------- |
| `match()`      | 返回匹配结果       | `'ab12'.match(/\d+/)`        |
| `matchAll()`   | 返回全部匹配迭代器 | `'a1b2'.matchAll(/\d/g)`     |
| `replace()`    | 正则替换           | `'a1'.replace(/\d/, '2')`    |
| `replaceAll()` | 全部替换           | `'a-a'.replaceAll('-', '/')` |
| `search()`     | 返回首个匹配位置   | `'abc'.search(/b/)`          |
| `split()`      | 按正则切分         | `'a, b; c'.split(/[;,]\s*/)` |

```ts
/**
 * 把连续空白折叠成单个空格。
 */
function normalizeSpace(text: string) {
  // \s+ 可以匹配多个连续空白字符，再统一替换成一个空格。
  return text.trim().replace(/\s+/g, ' ')
}
```

```ts
/**
 * 校验手机号格式是否符合简单规则。
 */
function isMobile(value: string) {
  // ^ 和 $ 用来限制整串匹配，避免局部命中。
  return /^1[3-9]\d{9}$/.test(value)
}
```

# 四、常见正则模板

```ts
/**
 * 校验邮箱格式。
 */
function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
```

```ts
/**
 * 提取 URL 中的所有数字片段。
 */
function getNumberParts(url: string) {
  // match 配合全局正则可以直接得到所有命中的子串。
  return url.match(/\d+/g) ?? []
}
```

```ts
/**
 * 把模板文本中的 {{name}} 占位符替换成真实值。
 */
function renderTemplate(template: string, data: Record<string, string>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    // 捕获组拿到变量名，再从数据对象中查值。
    return data[key] ?? ''
  })
}
```

# 五、JSON 常用方法

| 方法               | 作用               | 示例                  |
| ------------------ | ------------------ | --------------------- |
| `JSON.stringify()` | 对象转 JSON 字符串 | `JSON.stringify(obj)` |
| `JSON.parse()`     | JSON 字符串转对象  | `JSON.parse(text)`    |

```ts
/**
 * 安全解析 JSON，失败时返回兜底值。
 */
function safeParseJson<T>(text: string, fallback: T): T {
  try {
    // parse 只接受合法 JSON，异常场景用 try/catch 包住。
    return JSON.parse(text) as T
  } catch (error) {
    console.error(error)
    return fallback
  }
}
```

```ts
/**
 * 把对象格式化成便于查看的 JSON 文本。
 */
function toPrettyJson(value: unknown) {
  // 第三个参数用于控制缩进，方便调试和存档。
  return JSON.stringify(value, null, 2)
}
```

## 1. `JSON.stringify()` 常见注意点

- 会忽略 `undefined`、函数、`symbol`
- 循环引用会直接报错
- `Date` 会转成字符串

```ts
/**
 * 过滤掉对象中的敏感字段后再序列化。
 */
function stringifyWithoutSecret(value: Record<string, unknown>) {
  return JSON.stringify(value, (key, currentValue) => {
    // replacer 可以决定哪些字段被保留。
    if (key === 'password' || key === 'token') {
      return undefined
    }

    return currentValue
  })
}
```

## 2. `JSON.parse()` reviver

```ts
/**
 * 在解析 JSON 时把时间字符串恢复成 Date。
 */
function parseJsonWithDate(text: string) {
  return JSON.parse(text, (key, value) => {
    // reviver 会在每个字段解析后执行，适合做类型恢复。
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
      return new Date(value)
    }

    return value
  })
}
```

# 六、URLSearchParams

`URLSearchParams` 适合处理 URL 查询字符串，比如 `?page=1&keyword=js`。

| 方法         | 作用             | 示例                         |
| ------------ | ---------------- | ---------------------------- |
| `get()`      | 读取单个参数     | `params.get('page')`         |
| `getAll()`   | 读取同名全部参数 | `params.getAll('tag')`       |
| `set()`      | 设置参数         | `params.set('page', '2')`    |
| `append()`   | 追加参数         | `params.append('tag', 'js')` |
| `has()`      | 判断参数是否存在 | `params.has('page')`         |
| `delete()`   | 删除参数         | `params.delete('page')`      |
| `toString()` | 转成查询字符串   | `params.toString()`          |

```ts
/**
 * 读取当前地址栏中的分页参数。
 */
function getPageFromSearch(search: string) {
  const params = new URLSearchParams(search)
  const page = params.get('page')

  // 没传 page 时回退到 1，避免 Number(null) 变成 0。
  return page ? Number(page) : 1
}
```

```ts
/**
 * 更新查询参数并返回新的 URL 字符串。
 */
function buildUrlWithKeyword(urlText: string, keyword: string) {
  const url = new URL(urlText)

  // set 会覆盖旧值，适合单值参数。
  url.searchParams.set('keyword', keyword)

  return url.toString()
}
```

```ts
/**
 * 批量拼接查询参数。
 */
function buildSearchString(data: Record<string, string | number | boolean>) {
  const params = new URLSearchParams()

  Object.entries(data).forEach(([key, value]) => {
    // URLSearchParams 最终存的是字符串，所以这里统一转成字符串。
    params.set(key, String(value))
  })

  return params.toString()
}
```

# 七、模块系统 `import` / `export`

## 1. 命名导出

```ts
export function sum(a: number, b: number) {
  return a + b
}

export const version = '1.0.0'
```

```ts
import { sum, version } from './math'
```

## 2. 默认导出

```ts
export default function formatPrice(value: number) {
  return `¥${value.toFixed(2)}`
}
```

```ts
import formatPrice from './format-price'
```

## 3. 重命名导入导出

```ts
export { sum as add } from './math'
```

```ts
import { add as plus } from './math'
```

## 4. 动态导入

```ts
/**
 * 按需加载重模块，避免首屏一次性加载过多代码。
 */
async function loadChartModule() {
  // import() 会返回 Promise，适合做懒加载和按需拆包。
  const module = await import('./chart')
  return module
}
```

# 八、推荐使用场景

- `RegExp`：格式校验、文本提取、批量替换
- `JSON`：本地存储、接口入参与调试日志
- `URLSearchParams`：分页、筛选、路由参数同步
- 模块系统：拆分工具函数、做按需加载和代码复用

# 九、常见误区

- 用正则硬啃复杂 HTML 结构，结果维护成本很高
- 对不可信字符串直接 `JSON.parse()` 却不做异常处理
- 手写查询字符串拼接，导致编码和转义问题
- 默认导出和命名导出混着用，后期维护容易混乱
