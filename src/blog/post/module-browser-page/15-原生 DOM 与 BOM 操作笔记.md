---
title: 原生 DOM 与 BOM 操作笔记
date: 2026/05/19
desc: 按模板方式整理原生 DOM 与 BOM 高频写法，包括查询、创建、事件委托、滚动、复制、下载和窗口通信。
tags: ['#浏览器与页面', '#全部', '#DOM', '#BOM']
cover: https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" width=600 />

<small>这篇只放原生 DOM/BOM 常用模板，方便以后直接翻着写。</small>

# 一、节点查询与创建

```ts
/**
 * 查询元素，不存在时直接抛错。
 */
function getElement(selector: string) {
  const element = document.querySelector<HTMLElement>(selector)
  if (!element) throw new Error(`Element not found: ${selector}`)
  return element
}

/**
 * 创建带文本内容的节点。
 */
function createTextElement(tag: string, text: string) {
  const element = document.createElement(tag)
  // 用 textContent 写入文本，避免当成 HTML 解析。
  element.textContent = text
  return element
}
```

- 原理总结：查询时尽早失败，创建时优先使用安全文本写入。
- 注意点：用户输入内容不要直接拼 `innerHTML`。

# 二、事件委托

```ts
/**
 * 用父级统一处理列表点击。
 */
function bindListClick(container: HTMLElement) {
  container.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    // 从点击点向上查找真正需要处理的列表项。
    const item = target.closest('[data-id]')
    if (!item) return
    console.log(item.getAttribute('data-id'))
  })
}
```

- 原理总结：利用事件冒泡，父元素一个监听器处理所有子项。
- 注意点：动态列表尤其适合事件委托。

# 三、滚动与尺寸

```ts
/**
 * 获取元素相对视口的位置和尺寸。
 */
function getRect(element: HTMLElement) {
  return element.getBoundingClientRect()
}

/**
 * 平滑滚动到页面顶部。
 */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
```

- 原理总结：位置测量靠 `getBoundingClientRect()`，滚动控制靠 `scrollTo()`。
- 注意点：频繁测量尺寸时要小心触发回流。

# 四、复制与下载

```ts
/**
 * 复制文本到剪贴板。
 */
async function copyText(text: string) {
  await navigator.clipboard.writeText(text)
}

/**
 * 下载文本为本地文件。
 */
function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
```

- 原理总结：复制走浏览器剪贴板 API，下载走 `Blob + object URL`。
- 注意点：对象 URL 用完后记得 `revokeObjectURL()`。
