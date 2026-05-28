---
title: CSS 属性手册：选择器、权重与层叠规则
date: 2026/05/19
desc: 系统整理 CSS 选择器、优先级、继承、层叠与层管理规则，包含常见选择器类型、权重比较和示例，适合作为查询手册。
tags: ['#CSS手册', '#全部', '#CSS', '#手册']
cover: https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 5：这篇专门解决“为什么样式没生效、为什么被覆盖了”这类问题。</small>

# 一、基础选择器

| 类型 | 示例 | 说明 |
| --- | --- | --- |
| 通配 | `*` | 选择所有元素 |
| 标签 | `div` | 按标签名匹配 |
| 类 | `.card` | 按 class 匹配 |
| ID | `#app` | 按 id 匹配 |
| 属性 | `[disabled]` | 按属性匹配 |

# 二、组合选择器

| 类型 | 示例 | 说明 |
| --- | --- | --- |
| 后代 | `.box p` | 匹配后代 |
| 子代 | `.box > p` | 匹配直接子元素 |
| 相邻兄弟 | `h2 + p` | 匹配紧接兄弟 |
| 通用兄弟 | `h2 ~ p` | 匹配后续兄弟 |
| 多选择器 | `h1, h2, h3` | 多个选择器并列 |

# 三、伪类与伪元素回顾

常见伪类：

- `:hover`
- `:focus`
- `:focus-visible`
- `:active`
- `:checked`
- `:disabled`
- `:first-child`
- `:last-child`
- `:nth-child()`
- `:not()`
- `:is()`
- `:where()`

常见伪元素：

- `::before`
- `::after`
- `::placeholder`
- `::selection`
- `::marker`

# 四、优先级规则

简化顺序：

1. `!important`
2. 行内样式
3. ID 选择器
4. 类、属性、伪类
5. 标签、伪元素

示例比较：

```css
#app .title {
  color: red;
}

.card .title {
  color: blue;
}
```

- 上面 `#app .title` 优先级更高。

# 五、层叠与覆盖

最终样式不仅看优先级，还看：

- 是否命中同一元素
- 是否来自更高优先级声明
- 源码顺序谁在后
- 是否有 `!important`

```css
.title {
  color: red;
}

.title {
  color: blue;
}
```

- 相同优先级时，后写的覆盖先写的。

# 六、继承

常见可继承属性：

- `color`
- `font-family`
- `font-size`
- `line-height`
- `text-align`

常见不可继承属性：

- `margin`
- `padding`
- `border`
- `width`
- `height`

# 七、`!important`

```css
.danger {
  color: red !important;
}
```

- 作用：强制提高声明优先级。
- 注意点：除非明确需要，不要把它当常规解决方案。

# 八、层管理 `@layer`

```css
@layer reset, base, components, utilities;

@layer base {
  body {
    margin: 0;
  }
}
```

- 原理总结：`@layer` 用分层顺序控制样式覆盖，比硬拼选择器权重更稳。
- 注意点：大型项目特别适合用 layer 管理 reset、组件和工具类。

# 九、排查思路

当样式没生效时：

1. 先确认选择器是否命中。
2. 再看是否被更高权重规则覆盖。
3. 再看顺序是否被后写规则覆盖。
4. 最后看是否有继承或默认样式干扰。
