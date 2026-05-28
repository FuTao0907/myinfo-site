---
title: HTML 标签手册：全局事件属性与事件入口
date: 2026/05/19
desc: 系统整理 HTML 常见全局事件属性和事件入口，包括点击、输入、表单、键盘、焦点、鼠标与媒体相关事件，适合作为查询手册。
tags: ['#HTML手册', '#全部', '#HTML', '#手册']
cover: https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" width=600 />

<small>分卷 10：这篇专门整理 HTML 中常见事件入口，帮助你快速定位“这个交互该监听什么”。</small>

# 一、关于 HTML 事件属性

HTML 标签支持直接写事件属性，例如：

```html
<button onclick="handleClick()">点击</button>
```

但现代开发更推荐：

```ts
/**
 * 给按钮绑定点击事件。
 */
function bindClick(button: HTMLButtonElement) {
  button.addEventListener('click', () => {
    console.log('clicked')
  })
}
```

- 原理总结：HTML 事件属性是入口之一，但现代工程更推荐 JavaScript 统一绑定。
- 注意点：本文列出事件名，实际业务代码建议优先用 `addEventListener()`。

# 二、鼠标与点击事件

常见事件属性：

- `onclick`
- `ondblclick`
- `onmousedown`
- `onmouseup`
- `onmousemove`
- `onmouseenter`
- `onmouseleave`
- `onmouseover`
- `onmouseout`
- `oncontextmenu`

示例：

```html
<button onclick="console.log('click')">点击</button>
```

# 三、键盘事件

常见事件属性：

- `onkeydown`
- `onkeyup`
- `onkeypress`（历史上常见，但现代更常用前两个）

示例：

```html
<input onkeydown="console.log(event.key)" />
```

# 四、焦点事件

常见事件属性：

- `onfocus`
- `onblur`
- `onfocusin`
- `onfocusout`

示例：

```html
<input onfocus="console.log('focus')" onblur="console.log('blur')" />
```

# 五、输入与表单事件

常见事件属性：

- `oninput`
- `onchange`
- `onsubmit`
- `onreset`
- `oninvalid`

示例：

```html
<form onsubmit="console.log('submit')">
  <input oninput="console.log(this.value)" />
</form>
```

区别速记：

- `input`：值变化就触发
- `change`：提交式变化，通常失焦或确认后触发
- `submit`：表单提交时触发

# 六、拖拽与剪贴板事件

常见事件属性：

- `ondragstart`
- `ondragover`
- `ondrop`
- `oncopy`
- `oncut`
- `onpaste`

示例：

```html
<div ondragover="event.preventDefault()" ondrop="console.log('drop')">拖到这里</div>
```

# 七、媒体事件

常见事件属性：

- `onplay`
- `onpause`
- `onended`
- `ontimeupdate`
- `onvolumechange`
- `onloadedmetadata`

示例：

```html
<video controls onplay="console.log('play')" onpause="console.log('pause')"></video>
```

# 八、窗口与资源事件

常见事件属性：

- `onload`
- `onerror`
- `onresize`
- `onscroll`

示例：

```html
<img src="/demo.png" onerror="console.log('load error')" alt="demo" />
```

# 九、推荐实践

- 尽量用 `addEventListener()` 替代内联事件属性。
- 对大批量子元素优先使用事件委托。
- 高频事件（滚动、鼠标移动、输入）配合防抖/节流。
- 资源错误与表单错误要单独考虑兜底。

# 十、常见误区

- 把所有逻辑都直接塞进 `onclick`
- 高频事件里写重逻辑，不做节流
- 表单用 `change` 却期望每次输入都实时触发
- 忽略键盘事件和焦点事件，导致可访问性差
