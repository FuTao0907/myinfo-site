---
title: CSS 属性手册：Flex、Grid 与容器查询深入
date: 2026/05/19
desc: 系统整理 Flex、Grid 和容器查询的关键属性、常见布局模式与示例，适合作为现代布局查询手册。
tags: ['#CSS手册', '#全部', '#CSS', '#手册']
cover: https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop" width=600 />

<small>分卷 6：现代布局核心专题，专门解决 Flex、Grid 和容器查询怎么用的问题。</small>

# 一、Flex 容器属性

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `display` | `flex` `inline-flex` | 开启 Flex |
| `flex-direction` | `row` `row-reverse` `column` | 主轴方向 |
| `flex-wrap` | `nowrap` `wrap` | 是否换行 |
| `justify-content` | `flex-start` `center` `space-between` | 主轴对齐 |
| `align-items` | `stretch` `center` | 交叉轴对齐 |
| `align-content` | `stretch` `space-between` | 多行内容对齐 |
| `gap` | 长度值 | 间距 |

```css
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
```

# 二、Flex 子项属性

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `flex-grow` | `0` `1` | 放大比例 |
| `flex-shrink` | `0` `1` | 缩小比例 |
| `flex-basis` | `auto` `200px` | 初始尺寸 |
| `flex` | `1` `0 0 auto` | 三者简写 |
| `align-self` | `auto` `center` | 单项交叉轴对齐 |
| `order` | 数字 | 顺序 |

```css
.content {
  flex: 1;
}
```

# 三、Grid 容器属性

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `display` | `grid` `inline-grid` | 开启 Grid |
| `grid-template-columns` | `1fr 1fr` `repeat(...)` | 列轨道 |
| `grid-template-rows` | 长度值 | 行轨道 |
| `grid-template-areas` | 模板字符串 | 区域布局 |
| `gap` | 长度值 | 间距 |
| `justify-items` | `start` `center` `stretch` | 单元格水平 |
| `align-items` | `start` `center` `stretch` | 单元格垂直 |
| `place-items` | `center` | 简写 |

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
```

# 四、Grid 子项属性

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `grid-column` | `1 / 3` | 横向跨度 |
| `grid-row` | `1 / 2` | 纵向跨度 |
| `grid-area` | 区域名 | 指定区域 |
| `justify-self` | `start` `center` | 单项水平 |
| `align-self` | `start` `center` | 单项垂直 |

# 五、常见布局模式

## 1. 两栏布局

```css
.layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 16px;
}
```

## 2. 自适应卡片

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
```

## 3. 垂直居中

```css
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

# 六、容器查询

## 1. 启用容器

```css
.card-list {
  container-type: inline-size;
}
```

## 2. 查询容器宽度

```css
@container (max-width: 420px) {
  .card {
    grid-template-columns: 1fr;
  }
}
```

- 原理总结：媒体查询看视口，容器查询看组件所在容器。
- 注意点：组件复用场景下，容器查询比媒体查询更灵活。

# 七、常见坑

- Flex 子项超出容器时，记得给内容列加 `min-width: 0`。
- Grid 少量卡片想自动铺满时，优先试 `auto-fit`。
- `gap` 比手动 margin 更适合现代布局。
- 容器查询要先设置 `container-type` 才能生效。
