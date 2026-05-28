---
title: CSS 属性手册：Flex、Grid 实战模板
date: 2026/05/19
desc: 系统整理 Flex 和 Grid 的常见实战布局模板，包括两栏、三栏、居中、卡片网格、吸底和自适应布局，适合作为查询手册。
tags: ['#CSS手册', '#全部', '#CSS', '#手册']
cover: https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop" width=600 />

<small>分卷 13：把常见布局直接整理成模板，后面写页面时可以直接翻着套。</small>

# 一、水平垂直居中

```css
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

# 二、两栏布局

```css
.layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 16px;
}
```

# 三、三栏布局

```css
.layout-3 {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr) 300px;
  gap: 16px;
}
```

# 四、自适应卡片网格

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
```

# 五、导航栏左右分布

```css
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
```

# 六、列表项自动换行

```css
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
```

# 七、页面吸底布局

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

# 八、侧栏吸附

```css
.sidebar {
  position: sticky;
  top: 16px;
}
```

# 九、表格区域滚动

```css
.table-wrap {
  overflow-x: auto;
}
```

# 十、常见注意点

- Grid 内容列经常需要 `minmax(0, 1fr)` 防止撑爆。
- Flex 子元素溢出时常常需要 `min-width: 0`。
- 少量卡片自动铺满时，优先 `auto-fit`。
- 布局模板要和内容特性匹配，不要强行套一种方案。
