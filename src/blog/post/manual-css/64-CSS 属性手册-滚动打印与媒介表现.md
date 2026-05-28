---
title: CSS 属性手册：滚动、打印与媒介表现
date: 2026/05/19
desc: 系统整理 CSS 中滚动、打印和不同媒介表现相关的常见属性与规则，包括 scroll 系列、print 样式与页面输出建议，适合作为查询手册。
tags: ['#CSS手册', '#全部', '#CSS', '#手册']
cover: https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 10：这篇专门整理滚动和打印输出相关的 CSS 能力。</small>

# 一、滚动行为

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `scroll-behavior` | `auto` `smooth` | 平滑滚动 |
| `overflow` | `auto` `scroll` `hidden` | 溢出滚动控制 |
| `overscroll-behavior` | `auto` `contain` `none` | 边界滚动行为 |

```css
html {
  scroll-behavior: smooth;
}
```

# 二、滚动吸附

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `scroll-snap-type` | `x mandatory` | 定义滚动吸附 |
| `scroll-snap-align` | `start` `center` | 子项吸附位置 |
| `scroll-snap-stop` | `normal` `always` | 是否强制停留 |

```css
.slider {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.slide {
  scroll-snap-align: start;
}
```

# 三、滚动定位辅助

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `scroll-margin-top` | 长度值 | 锚点定位留白 |
| `scroll-padding-top` | 长度值 | 容器滚动内边距 |

```css
.section {
  scroll-margin-top: 80px;
}
```

# 四、打印样式

```css
@media print {
  nav,
  .toolbar,
  .no-print {
    display: none !important;
  }

  body {
    background: #fff;
    color: #000;
  }
}
```

打印时常见处理：

- 隐藏导航、按钮、交互区
- 调整正文颜色和背景
- 控制分页相关表现

# 五、打印相关建议

- 页面要保证黑白打印也能清晰阅读
- 链接最好能保留可读 URL 或明显语义
- 不要依赖 hover 态来传递关键信息
- 报表和长文档最好专门写 `@media print`

# 六、常见注意点

- 平滑滚动适合导航跳转，不适合所有复杂滚动场景
- 吸附滚动适合轮播或卡片列表，不适合所有长内容页面
- 打印样式需要真实打印预览验证，不能只看浏览器屏幕效果
