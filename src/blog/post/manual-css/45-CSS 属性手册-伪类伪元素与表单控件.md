---
title: CSS 属性手册：伪类、伪元素与表单控件
date: 2026/05/19
desc: 系统整理 CSS 常见伪类、伪元素以及表单控件相关样式能力，包含常用选择器、状态控制与示例，适合作为查询手册。
tags: ['#CSS手册', '#全部', '#CSS', '#手册']
cover: https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 3：聚焦伪类、伪元素和表单样式，是业务开发里非常高频的一组 CSS 能力。</small>

# 一、常见伪类

| 伪类 | 作用 | 示例 |
| --- | --- | --- |
| `:hover` | 鼠标悬停 | `.btn:hover {}` |
| `:active` | 激活状态 | `.btn:active {}` |
| `:focus` | 获得焦点 | `input:focus {}` |
| `:focus-visible` | 键盘焦点可见 | `button:focus-visible {}` |
| `:focus-within` | 内部元素聚焦时匹配父级 | `.field:focus-within {}` |
| `:visited` | 已访问链接 | `a:visited {}` |
| `:disabled` | 禁用状态 | `button:disabled {}` |
| `:checked` | 勾选状态 | `input:checked {}` |
| `:required` | 必填项 | `input:required {}` |
| `:valid` / `:invalid` | 校验状态 | `input:invalid {}` |
| `:first-child` | 首个子元素 | `li:first-child {}` |
| `:last-child` | 最后子元素 | `li:last-child {}` |
| `:nth-child()` | 按序号匹配 | `li:nth-child(2n) {}` |
| `:not()` | 排除匹配 | `.item:not(.active) {}` |
| `:is()` | 合并多个选择器 | `:is(h1, h2, h3) {}` |
| `:where()` | 零权重分组选择器 | `:where(main, section) {}` |

# 二、常见伪元素

| 伪元素 | 作用 | 示例 |
| --- | --- | --- |
| `::before` | 元素前插入内容 | `.tag::before { content: '#'; }` |
| `::after` | 元素后插入内容 | `.link::after { content: '→'; }` |
| `::placeholder` | 输入占位文本样式 | `input::placeholder {}` |
| `::selection` | 选中文本样式 | `::selection {}` |
| `::marker` | 列表标记样式 | `li::marker {}` |
| `::file-selector-button` | 文件输入按钮 | `input[type="file"]::file-selector-button {}` |

```css
.tag::before {
  content: '#';
  color: #64748b;
}
```

# 三、表单控件样式

## 1. 输入框基础

```css
input,
textarea,
select {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font: inherit;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}
```

## 2. 占位与禁用态

```css
input::placeholder {
  color: #94a3b8;
}

input:disabled {
  background: #f1f5f9;
  cursor: not-allowed;
}
```

## 3. 校验态

```css
input:invalid {
  border-color: #ef4444;
}

input:valid {
  border-color: #22c55e;
}
```

## 4. 复选框和强调色

```css
input[type='checkbox'],
input[type='radio'] {
  accent-color: #2563eb;
}
```

# 四、交互组合写法

## `:focus-within`

```css
.field {
  border: 1px solid #d1d5db;
  border-radius: 10px;
}

.field:focus-within {
  border-color: #2563eb;
}
```

## `:checked`

```css
input[type='checkbox']:checked + label {
  color: #2563eb;
  font-weight: 600;
}
```

# 五、注意点

- 优先使用 `:focus-visible` 保留键盘用户焦点反馈。
- 自定义复选框/单选框前，先评估是否真的有必要。
- `::before` / `::after` 的内容不适合承载真正重要的信息。
