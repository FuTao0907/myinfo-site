---
title: CSS 属性手册：盒模型布局与定位
date: 2026/05/19
desc: 逐条整理 CSS 盒模型、显示、布局与定位相关属性，包含常用值和示例，适合作为布局开发查询手册。
tags: ['#CSS手册', '#全部', '#CSS', '#手册']
cover: https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 1：布局向手册，专注盒模型、定位、Flex、Grid。</small>

# 一、盒模型属性

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `box-sizing` | `content-box` `border-box` | 宽高计算方式 |
| `width` / `height` | `px` `%` `auto` | 宽高 |
| `min-width` / `max-width` | 长度值 | 宽度约束 |
| `min-height` / `max-height` | 长度值 | 高度约束 |
| `padding` | `8px` `16px` | 内边距 |
| `border` | `1px solid #ddd` | 边框 |
| `margin` | `0 auto` | 外边距 |
| `overflow` | `visible` `hidden` `auto` `scroll` | 溢出处理 |

```css
.box {
  box-sizing: border-box;
  width: 320px;
  padding: 16px;
  border: 1px solid #ddd;
  margin: 0 auto;
}
```

# 二、显示与可见性

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `display` | `block` `inline` `inline-block` `flex` `grid` `none` | 显示类型 |
| `visibility` | `visible` `hidden` | 可见性 |
| `opacity` | `0-1` | 透明度 |

```css
.hidden {
  display: none;
}
```

# 三、定位属性

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `position` | `static` `relative` `absolute` `fixed` `sticky` | 定位方式 |
| `top/right/bottom/left` | 长度值 | 偏移 |
| `z-index` | 数字 | 层级 |

```css
.popover {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
}
```

# 四、Flex 布局属性

父容器：

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `display` | `flex` `inline-flex` | 启用 Flex |
| `flex-direction` | `row` `column` | 主轴方向 |
| `flex-wrap` | `nowrap` `wrap` | 是否换行 |
| `justify-content` | `flex-start` `center` `space-between` | 主轴对齐 |
| `align-items` | `stretch` `center` | 交叉轴对齐 |
| `align-content` | `stretch` `space-between` | 多行对齐 |
| `gap` | 长度值 | 间距 |

子元素：

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `flex` | `1` `0 0 auto` | 缩放综合 |
| `flex-grow` | `0` `1` | 放大比例 |
| `flex-shrink` | `0` `1` | 缩小比例 |
| `flex-basis` | 长度值 | 初始主轴尺寸 |
| `align-self` | `auto` `center` | 单项交叉轴对齐 |
| `order` | 数字 | 排序 |

```css
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
```

# 五、Grid 布局属性

父容器：

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `display` | `grid` `inline-grid` | 启用 Grid |
| `grid-template-columns` | `1fr 1fr` `repeat(...)` | 列轨道 |
| `grid-template-rows` | 长度值 | 行轨道 |
| `grid-template-areas` | 字符串模板 | 区域布局 |
| `gap` | 长度值 | 网格间距 |
| `justify-items` | `start` `center` `stretch` | 单元格内水平 |
| `align-items` | `start` `center` `stretch` | 单元格内垂直 |
| `place-items` | `center` | 简写 |

子元素：

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `grid-column` | `1 / 3` | 横向跨轨道 |
| `grid-row` | `1 / 2` | 纵向跨轨道 |
| `grid-area` | 区域名 | 指定区域 |
| `justify-self` | `start` `center` | 单项水平 |
| `align-self` | `start` `center` | 单项垂直 |

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
```

# 六、浮动与清除

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `float` | `left` `right` `none` | 浮动 |
| `clear` | `left` `right` `both` | 清除浮动 |

# 七、常见布局模板

两栏布局：

```css
.layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 16px;
}
```

吸底布局：

```css
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
```

粘性吸附：

```css
.sticky {
  position: sticky;
  top: 0;
}
```
