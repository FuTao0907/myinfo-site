---
title: CSS 属性手册：表单控件与交互状态细化
date: 2026/05/19
desc: 系统整理 CSS 中输入框、按钮、选择框、占位符、禁用态、校验态和焦点状态相关样式能力，适合作为查询手册。
tags: ['#CSS手册', '#全部', '#CSS', '#手册']
cover: https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 11：专门整理表单控件样式和交互状态，是业务开发里非常高频的一组内容。</small>

# 一、输入控件基础样式

```css
input,
textarea,
select {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font: inherit;
  background: #fff;
  color: #111827;
}
```

常用属性：

- `appearance`
- `outline`
- `border`
- `border-radius`
- `background`
- `color`
- `font`
- `resize`（主要用于 `textarea`）

# 二、焦点与键盘可见状态

```css
input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #2563eb;
}

button:focus-visible,
input:focus-visible {
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}
```

- 建议：优先保留 `:focus-visible`，不要为了“干净”去掉所有焦点样式。

# 三、占位、禁用与只读

```css
input::placeholder,
textarea::placeholder {
  color: #94a3b8;
}

input:disabled,
textarea:disabled,
select:disabled {
  background: #f1f5f9;
  cursor: not-allowed;
}

input[readonly] {
  background: #f8fafc;
}
```

# 四、校验态与选择态

```css
input:invalid {
  border-color: #ef4444;
}

input:valid {
  border-color: #22c55e;
}

input:checked + label {
  color: #2563eb;
  font-weight: 600;
}
```

# 五、文件输入与强调色

```css
input[type='file']::file-selector-button {
  padding: 8px 12px;
  border: 0;
  border-radius: 8px;
  background: #2563eb;
  color: white;
}

input[type='checkbox'],
input[type='radio'] {
  accent-color: #2563eb;
}
```

# 六、按钮状态

```css
.btn {
  padding: 10px 16px;
  border: 0;
  border-radius: 10px;
  background: #2563eb;
  color: #fff;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

# 七、推荐实践

- 输入控件统一继承字体。
- 按钮和输入控件统一圆角、边框、焦点规范。
- 校验态和禁用态要有明显区分。
- 文件输入按钮样式可通过 `::file-selector-button` 定制。
