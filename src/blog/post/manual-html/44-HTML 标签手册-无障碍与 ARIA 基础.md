---
title: HTML 标签手册：无障碍与 ARIA 基础
date: 2026/05/19
desc: 系统整理 HTML 无障碍基础与常见 ARIA 属性，包括语义、角色、状态、键盘可访问性和常见实践误区，适合作为前端无障碍入门手册。
tags: ['#HTML手册', '#全部', '#HTML', '#无障碍']
cover: https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 4：这篇专门讲无障碍和 ARIA，不再混在普通 HTML 标签说明里。</small>

# 一、无障碍的最小原则

- 有语义先用语义。
- 能用原生交互元素就不用自定义替代。
- 所有交互都应可被键盘访问。
- 焦点必须可见。
- 图片、表单、对话框都要有可理解的文本信息。

# 二、常见原生语义优势

推荐：

```html
<button type="button">保存</button> <a href="/about">关于</a>
```

不推荐：

```html
<div onclick="save()">保存</div>
<span onclick="goAbout()">关于</span>
```

- 原理总结：原生元素自带键盘支持、焦点行为和语义信息。
- 注意点：很多 ARIA 问题本质上是“没用对原生元素”。

# 三、常见 ARIA 属性

| 属性               | 作用               | 示例                                          |
| ------------------ | ------------------ | --------------------------------------------- |
| `aria-label`       | 给控件补充可读名称 | `<button aria-label="关闭">×</button>`        |
| `aria-labelledby`  | 由其他元素提供名称 | `<div aria-labelledby="title"></div>`         |
| `aria-describedby` | 由其他元素提供描述 | `<input aria-describedby="tip" />`            |
| `aria-hidden`      | 对辅助技术隐藏     | `<span aria-hidden="true">★</span>`           |
| `aria-expanded`    | 展开状态           | `<button aria-expanded="false"></button>`     |
| `aria-controls`    | 关联受控区域       | `<button aria-controls="panel-1"></button>`   |
| `aria-current`     | 当前项标识         | `<a aria-current="page">首页</a>`             |
| `aria-live`        | 动态内容播报区域   | `<div aria-live="polite"></div>`              |
| `aria-modal`       | 模态对话框标识     | `<div role="dialog" aria-modal="true"></div>` |
| `aria-pressed`     | 按压态按钮         | `<button aria-pressed="true"></button>`       |
| `aria-selected`    | 选中态             | `<div role="tab" aria-selected="true"></div>` |
| `aria-invalid`     | 校验错误状态       | `<input aria-invalid="true" />`               |
| `aria-required`    | 必填状态           | `<input aria-required="true" />`              |

# 四、常见 role

| role         | 作用           | 示例                                  |
| ------------ | -------------- | ------------------------------------- |
| `button`     | 按钮角色       | `<div role="button"></div>`           |
| `dialog`     | 对话框         | `<div role="dialog"></div>`           |
| `alert`      | 立即播报提示   | `<div role="alert"></div>`            |
| `status`     | 状态提示       | `<div role="status"></div>`           |
| `tablist`    | 标签页容器     | `<div role="tablist"></div>`          |
| `tab`        | 标签页按钮     | `<button role="tab"></button>`        |
| `tabpanel`   | 标签页内容面板 | `<section role="tabpanel"></section>` |
| `navigation` | 导航区         | `<nav role="navigation"></nav>`       |

- 注意点：优先原生语义，只有原生不够时才补 `role`。

# 五、表单无障碍

```html
<label for="email">邮箱</label>
<input id="email" name="email" type="email" aria-describedby="email-tip" required />
<p id="email-tip">请输入常用邮箱地址</p>
```

错误态：

```html
<input id="username" aria-invalid="true" aria-describedby="username-error" />
<p id="username-error">用户名不能为空</p>
```

# 六、对话框与动态内容

对话框：

```html
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <h2 id="dialog-title">删除确认</h2>
  <p>确定删除吗？</p>
</div>
```

动态状态：

```html
<div role="status" aria-live="polite">保存成功</div>
```

- 原理总结：读屏器依赖 ARIA 关系来理解动态区域和交互状态。
- 注意点：对话框需要焦点管理，不能只显示出来就结束。

# 七、键盘可访问性

- `Tab`：切换焦点
- `Enter`：激活按钮/链接
- `Space`：按钮、复选框等常见交互
- `Esc`：关闭弹层/对话框

如果你自定义组件，至少要补：

- 可聚焦：`tabindex="0"`
- 键盘事件支持
- 状态 ARIA 标记

# 八、常见误区

- 把 `div` 当按钮用，却没有键盘支持
- 图片缺少 `alt`
- 弹窗打开后焦点没有进入对话框
- 完全移除 `outline`
- 到处乱加 `role` 和 `aria-*`，反而破坏原生语义

# 九、检查清单

- 是否优先用了原生语义标签？
- 所有交互元素是否可键盘访问？
- 表单控件是否关联 `label`？
- 动态错误信息是否可被辅助技术感知？
- 对话框是否具备角色、标题和焦点管理？
