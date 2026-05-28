---
title: HTML 标签手册：交互标签与嵌入内容深入
date: 2026/05/19
desc: 系统整理 HTML 中常见交互标签与嵌入内容标签，包括 details、summary、dialog、iframe、embed、object、param 等，适合作为查询手册。
tags: ['#HTML手册', '#全部', '#HTML', '#手册']
cover: https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 9：专门整理 HTML 里的交互型标签和嵌入内容标签。</small>

# 一、`details` 与 `summary`

## 1. `details`

- 作用：折叠/展开的详情容器。
- 常用属性：`open`。

```html
<details>
  <summary>查看更多</summary>
  <p>这里是详细内容。</p>
</details>
```

## 2. `summary`

- 作用：`details` 的摘要标题，点击后可展开或收起。

- 注意点：
- `summary` 通常应作为 `details` 的第一个子元素。
- 若需要默认展开，可给 `details` 添加 `open`。

# 二、`dialog`

## 1. 作用

- 原生对话框容器，适合模态或非模态弹窗。

## 2. 常用属性

- `open`

## 3. 最小示例

```html
<dialog open>
  <p>这是一个对话框</p>
  <button>关闭</button>
</dialog>
```

## 4. 常见用法

```ts
/**
 * 打开原生 dialog。
 */
function openDialog(id: string) {
  const dialog = document.getElementById(id) as HTMLDialogElement | null
  if (!dialog) return
  dialog.showModal()
}
```

- 注意点：
- 模态弹窗更适合 `showModal()`。
- 关闭时可以调用 `close()`。
- 对话框仍要考虑焦点管理和标题说明。

# 三、`iframe`

## 1. 作用

- 嵌入另一个 HTML 页面。

## 2. 常用属性

- `src`
- `title`
- `loading`
- `allow`
- `sandbox`
- `referrerpolicy`

## 3. 示例

```html
<iframe
  src="https://example.com"
  title="示例页面"
  loading="lazy"
  sandbox="allow-scripts allow-same-origin"
></iframe>
```

- 注意点：
- `iframe` 一定写 `title`。
- 对第三方页面优先评估 `sandbox` 限制。
- `loading="lazy"` 适合非首屏 iframe。

# 四、`embed`、`object`、`param`

## 1. `embed`

- 作用：嵌入外部资源，如 PDF。

```html
<embed src="/docs/demo.pdf" type="application/pdf" width="600" height="400" />
```

## 2. `object`

- 作用：嵌入对象资源，可作为更通用容器。

```html
<object data="/images/logo.svg" type="image/svg+xml" width="200" height="200"></object>
```

## 3. `param`

- 作用：为 `object` 提供附加参数。

```html
<object data="/movie.swf">
  <param name="quality" value="high" />
</object>
```

- 注意点：
- 现代项目里 `param` 和部分老式嵌入写法已经很少见。
- 嵌入 PDF 或 SVG 时，通常 `embed` / `object` 足够。

# 五、什么时候选哪种

- 可折叠说明：`details` / `summary`
- 原生弹窗：`dialog`
- 嵌入整页内容：`iframe`
- 嵌入 PDF 或对象资源：`embed` / `object`

# 六、常见误区

- 用一堆自定义 div 模拟折叠区域，却不考虑语义和键盘交互
- `iframe` 不写 `title`
- 对第三方 iframe 不做安全限制
- 把 `dialog` 只当普通 div 用，没有配合脚本控制打开关闭
