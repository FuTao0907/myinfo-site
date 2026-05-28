---
title: JavaScript 常用工具函数笔记
date: 2026/05/19
desc: 按速查和模板方式整理最常复用的 JavaScript 工具函数，包括防抖、节流、分组、去重、深拷贝和重试。
tags: ['#浏览器与页面', '#全部', '#JavaScript', '#工具函数']
cover: https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>只留以后写代码最常抄的 JavaScript 模板，不展开大段理论。</small>

# 一、速查

| 方法 | 场景 |
| --- | --- |
| debounce | 输入搜索、自动保存 |
| throttle | 滚动、拖拽 |
| groupBy | 列表分组 |
| uniqueBy | 数组去重 |
| deepClone | 普通 JSON 数据深拷贝 |
| retry | 临时失败自动重试 |

# 二、防抖与节流

```ts
/**
 * 防抖：停止触发 delay 毫秒后才真正执行。
 */
function debounce<T extends (...args: unknown[]) => void>(fn: T, delay = 300) {
  let timer: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    // 每次触发都先取消旧定时器，确保只保留最后一次。
    if (timer) clearTimeout(timer)
    // 用户停下来之后才执行，适合输入框这类场景。
    timer = setTimeout(() => fn(...args), delay)
  }
}

/**
 * 节流：固定时间窗口内只执行一次。
 */
function throttle<T extends (...args: unknown[]) => void>(fn: T, delay = 200) {
  let last = 0

  return (...args: Parameters<T>) => {
    const now = Date.now()
    // 时间间隔不足时直接跳过，避免高频执行。
    if (now - last < delay) return
    last = now
    fn(...args)
  }
}
```

- 原理总结：防抖保留最后一次，节流保留固定频率。
- 注意点：输入框优先防抖，滚动和拖拽优先节流。

# 三、分组与去重

```ts
/**
 * 根据指定字段把数组分组。
 */
function groupBy<T extends Record<string, unknown>>(list: T[], key: keyof T) {
  return list.reduce<Record<string, T[]>>((acc, item) => {
    const groupKey = String(item[key])
    if (!acc[groupKey]) acc[groupKey] = []
    acc[groupKey].push(item)
    return acc
  }, {})
}

/**
 * 根据指定字段去重。
 */
function uniqueBy<T extends Record<string, unknown>>(list: T[], key: keyof T) {
  const seen = new Set<unknown>()

  return list.filter((item) => {
    const value = item[key]
    if (seen.has(value)) return false
    seen.add(value)
    return true
  })
}
```

- 原理总结：分组靠对象累加，去重靠 `Set` 记录已出现值。
- 注意点：如果 key 是对象或数组，这种去重方式就不够用了。

# 四、深拷贝与重试

```ts
/**
 * 适合普通 JSON 数据的深拷贝。
 */
function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

/**
 * 失败后自动重试指定次数。
 */
async function retry<T>(task: () => Promise<T>, count = 3): Promise<T> {
  let lastError: unknown

  for (let i = 0; i < count; i += 1) {
    try {
      return await task()
    } catch (error) {
      // 每次失败都缓存最后一次异常，最终统一抛出。
      lastError = error
    }
  }

  throw lastError
}
```

- 原理总结：深拷贝走 JSON 序列化，重试靠循环重新执行异步任务。
- 注意点：`deepClone()` 不适合 `Date`、`Map`、函数和循环引用数据。
