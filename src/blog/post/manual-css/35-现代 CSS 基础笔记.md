---
title: CSS 样式手册（全量索引版）
date: 2026/05/19
desc: 按手册方式整理 CSS 常用样式与现代能力，覆盖选择器、层叠、盒模型、布局、文本、背景、边框、动画、响应式、函数和层管理。
tags: ['#CSS手册', '#全部', '#CSS', '#前端基础']
cover: https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>手册型写法：按 CSS 模块分类整理常用属性、典型值和最小示例，方便像查文档一样使用。</small>

# 一、手册边界

- 本文按 CSS 模块分类整理常用属性和写法。
- 重点放在“属性做什么、怎么写、常用值是什么”。
- 偏索引手册，不是单纯概念文章。

# 二、分卷导航

先看总索引，再按问题进入对应分卷：

- 盒模型、布局与定位：`39`
- 文本、背景、动画与响应式：`40`
- 伪类、伪元素与表单控件：`45`
- 滤镜、混合模式、滚动与打印：`46`
- 选择器权重与层叠规则：`51`
- Flex、Grid 与容器查询：`52`
- 颜色、单位、函数与变量：`57`
- 过渡、动画、变换与视觉效果：`58`
- 媒体查询、容器查询与环境偏好：`63`
- 滚动、打印与媒介表现：`64`
- 表单控件与交互状态细化：`69`
- 文本排版、列表、背景、边框、阴影：`70`
- Flex、Grid 实战模板：`75`
- 滤镜、混合模式与阴影视觉细化：`76`

# 三、推荐查找路径

- 查属性属于什么模块：先看这篇
- 查布局模板：优先看 `39`、`52`、`75`
- 查动画、视觉效果：优先看 `40`、`58`、`76`
- 查响应式和环境适配：优先看 `63`、`64`
- 查表单样式和状态：优先看 `45`、`69`

# 四、选择器与层叠

常见选择器：

| 类别     | 示例         | 说明           |
| -------- | ------------ | -------------- |
| 通配     | `*`          | 选中全部元素   |
| 标签     | `div`        | 按标签名选择   |
| 类       | `.card`      | 按 class 选择  |
| ID       | `#app`       | 按 id 选择     |
| 属性     | `[disabled]` | 按属性选择     |
| 伪类     | `:hover`     | 按状态选择     |
| 伪元素   | `::before`   | 选中伪元素     |
| 后代     | `.box p`     | 选中后代       |
| 子代     | `.box > p`   | 选中直接子元素 |
| 相邻兄弟 | `h2 + p`     | 选中紧邻兄弟   |

优先级简表：

- `!important`
- 行内样式
- `#id`
- `.class` / `[attr]` / `:pseudo-class`
- `tag` / `::pseudo-element`

# 五、盒模型与尺寸属性

| 属性                      | 常用值                             | 作用             |
| ------------------------- | ---------------------------------- | ---------------- |
| `box-sizing`              | `content-box` `border-box`         | 定义宽高计算方式 |
| `width` / `height`        | `px` `%` `auto`                    | 宽高             |
| `min-width` / `max-width` | 长度值                             | 最小/最大宽度    |
| `padding`                 | `10px` `1rem`                      | 内边距           |
| `border`                  | `1px solid #ddd`                   | 边框             |
| `margin`                  | `0 auto`                           | 外边距           |
| `overflow`                | `visible` `hidden` `auto` `scroll` | 溢出处理         |

示例：

```css
.box {
  box-sizing: border-box;
  width: 320px;
  padding: 16px;
  border: 1px solid #ddd;
  margin: 0 auto;
}
```

# 六、显示与布局属性

| 属性                    | 常用值                                               | 作用     |
| ----------------------- | ---------------------------------------------------- | -------- |
| `display`               | `block` `inline` `inline-block` `flex` `grid` `none` | 显示类型 |
| `position`              | `static` `relative` `absolute` `fixed` `sticky`      | 定位方式 |
| `top/right/bottom/left` | 长度值                                               | 定位偏移 |
| `z-index`               | 数字                                                 | 层级     |
| `float`                 | `left` `right`                                       | 浮动     |
| `clear`                 | `both`                                               | 清除浮动 |

Flex：

| 属性              | 常用值                   | 作用       |
| ----------------- | ------------------------ | ---------- |
| `flex-direction`  | `row` `column`           | 主轴方向   |
| `justify-content` | `center` `space-between` | 主轴对齐   |
| `align-items`     | `center` `stretch`       | 交叉轴对齐 |
| `gap`             | `8px` `16px`             | 间距       |
| `flex`            | `1` `0 0 auto`           | 缩放规则   |

Grid：

| 属性                       | 常用值                  | 作用      |
| -------------------------- | ----------------------- | --------- |
| `grid-template-columns`    | `1fr 1fr` `repeat(...)` | 列定义    |
| `grid-template-rows`       | 长度值                  | 行定义    |
| `grid-column` / `grid-row` | `1 / 3`                 | 跨列/跨行 |
| `place-items`              | `center`                | 统一对齐  |

# 七、文本与字体属性

| 属性              | 常用值                     | 作用       |
| ----------------- | -------------------------- | ---------- |
| `color`           | 颜色值                     | 文本颜色   |
| `font-size`       | `16px` `1rem` `clamp(...)` | 字号       |
| `font-family`     | 字体栈                     | 字体族     |
| `font-weight`     | `400` `500` `700`          | 字重       |
| `line-height`     | `1.5` `24px`               | 行高       |
| `text-align`      | `left` `center` `right`    | 对齐       |
| `text-decoration` | `none` `underline`         | 装饰线     |
| `text-transform`  | `uppercase`                | 大小写转换 |
| `letter-spacing`  | 长度值                     | 字距       |
| `white-space`     | `nowrap` `pre-wrap`        | 空白处理   |
| `text-overflow`   | `ellipsis`                 | 溢出省略   |

示例：

```css
.title {
  color: #111827;
  font-size: clamp(24px, 4vw, 40px);
  font-weight: 700;
  line-height: 1.2;
}
```

# 八、背景与边框属性

| 属性                  | 常用值                            | 作用     |
| --------------------- | --------------------------------- | -------- |
| `background-color`    | 颜色值                            | 背景色   |
| `background-image`    | `url(...)` `linear-gradient(...)` | 背景图   |
| `background-size`     | `cover` `contain`                 | 背景尺寸 |
| `background-position` | `center`                          | 背景位置 |
| `border-radius`       | `8px` `50%`                       | 圆角     |
| `box-shadow`          | 阴影值                            | 盒阴影   |
| `outline`             | `none` `1px solid`                | 外轮廓   |

# 九、变换、过渡与动画

| 属性               | 常用值                             | 作用     |
| ------------------ | ---------------------------------- | -------- |
| `transform`        | `translate()` `scale()` `rotate()` | 变换     |
| `transform-origin` | `center`                           | 变换原点 |
| `transition`       | `all .2s ease`                     | 过渡     |
| `animation`        | `name duration timing-function`    | 动画     |
| `opacity`          | `0-1`                              | 透明度   |
| `filter`           | `blur()` `grayscale()`             | 滤镜     |

示例：

```css
.item {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.item:hover {
  transform: translateY(-2px);
  opacity: 0.95;
}
```

# 十、响应式与现代能力

| 属性/规则          | 常用值               | 作用           |
| ------------------ | -------------------- | -------------- |
| `@media`           | `(max-width: 768px)` | 视口响应式     |
| `@container`       | `(max-width: 420px)` | 容器响应式     |
| `container-type`   | `inline-size`        | 启用容器查询   |
| `aspect-ratio`     | `16 / 9`             | 宽高比         |
| `object-fit`       | `cover` `contain`    | 媒体填充       |
| `scroll-behavior`  | `smooth`             | 平滑滚动       |
| `scroll-snap-type` | `x mandatory`        | 滚动吸附       |
| `accent-color`     | 颜色值               | 原生表单强调色 |
| `color-scheme`     | `light dark`         | 系统配色提示   |

# 十一、函数与变量

| 名称              | 示例                     | 作用           |
| ----------------- | ------------------------ | -------------- |
| `var()`           | `var(--color-text)`      | 读取 CSS 变量  |
| `calc()`          | `calc(100% - 32px)`      | 计算值         |
| `min()` / `max()` | `min(100%, 1200px)`      | 取最小/最大    |
| `clamp()`         | `clamp(16px, 2vw, 24px)` | 最小-弹性-最大 |

变量示例：

```css
:root {
  --color-text: #111827;
  --space-4: 16px;
}

.card {
  color: var(--color-text);
  padding: var(--space-4);
}
```

# 十二、层管理与工程建议

```css
@layer reset, base, components, utilities;
```

建议：

- 优先语义化类名
- 控制选择器层级
- 少用 `!important`
- 建立 token 体系
- 优先 `transform` / `opacity` 动画
- 为响应式预留容器查询思路
