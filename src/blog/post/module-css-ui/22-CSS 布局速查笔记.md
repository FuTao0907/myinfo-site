---
title: CSS 布局速查笔记
date: 2026/05/19
desc: 按速查和模板方式整理最常用的 CSS 布局，包括 Flex 居中、两栏、自适应网格、吸底和粘性布局。
tags: ['#CSS与界面', '#全部', '#CSS', '#布局']
cover: https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>布局这类内容最适合做速查表，这篇只留以后最常翻的模板。</small>

# 一、速查

| 布局 | 场景 |
| --- | --- |
| Flex 居中 | 按钮、弹窗、空状态 |
| 两栏布局 | 侧边栏 + 主内容 |
| 自适应网格 | 卡片列表 |
| 吸底布局 | 页脚吸底 |
| sticky | 目录、头部吸附 |

# 二、Flex 居中

```css
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

- 原理总结：交叉轴和主轴同时居中。
- 注意点：父容器必须有明确高度或内容空间。

# 三、两栏布局

```css
.layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 16px;
}
```

- 原理总结：左边固定宽度，右边自动占满剩余空间。
- 注意点：右侧列用 `minmax(0, 1fr)` 可以避免内容撑爆。

# 四、自适应卡片网格

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
```

- 原理总结：列数由容器宽度自动决定，卡片宽度保持在最小值以上。
- 注意点：卡片数量少时 `auto-fit` 往往比 `auto-fill` 更自然。

# 五、吸底与 sticky

```css
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.sticky {
  position: sticky;
  top: 16px;
}
```

- 原理总结：吸底布局靠纵向 Flex 撑满，sticky 靠滚动到阈值后吸附。
- 注意点：sticky 祖先元素不要设置会破坏滚动上下文的属性。
