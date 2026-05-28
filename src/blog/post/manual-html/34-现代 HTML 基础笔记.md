---
title: HTML 标签手册（全量索引版）
date: 2026/05/19
desc: 按手册方式整理 HTML 标签，覆盖文档结构、文本语义、分组、表格、表单、媒体、交互、脚本和 Web Components，提供用途解释与最小示例。
tags: ['#HTML手册', '#全部', '#HTML', '#前端基础']
cover: https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" width=600 />

<small>手册型写法：以“标签解释 + 常用属性 + 最小示例”为主，方便像查文档一样直接检索。</small>

# 一、手册边界

- 本文覆盖 HTML 标准标签的常用与核心场景解释。
- 每个分组给出：用途、常用属性、最小示例。
- 重点兼顾语义、可访问性和工程可维护性。

# 二、分卷导航

先看总索引，再按主题进入对应分卷：

- 文档结构与文本语义：`37`
- 表单、媒体、交互嵌入：`38`
- 全局属性、链接与资源关系：`43`
- 无障碍与 ARIA：`44`
- Head、SEO 与元数据：`49`
- Input 类型与原生校验：`50`
- 表格与数据展示：`55`
- 媒体图形与 Web Components：`56`
- 交互标签与嵌入内容深入：`61`
- 全局事件属性与事件入口：`62`
- 文本域、选择控件、字段分组：`67`
- 输出、进度、计量与辅助标签：`68`
- SVG 图形基础与常用元素：`73`
- Canvas 绘图与音视频补充属性：`74`

# 三、推荐查找路径

- 查标签叫法和最小示例：先看这篇
- 查表单相关：优先看 `50`、`67`、`68`
- 查媒体、图形、嵌入：优先看 `56`、`61`、`73`、`74`
- 查语义、SEO、可访问性：优先看 `37`、`44`、`49`

# 四、文档与元数据标签

| 标签              | 作用                | 常用属性                     | 最小示例                                  |
| ----------------- | ------------------- | ---------------------------- | ----------------------------------------- |
| `<!doctype html>` | 声明 HTML5 文档类型 | 无                           | `<!doctype html>`                         |
| `html`            | 根元素              | `lang`                       | `<html lang="zh-CN">`                     |
| `head`            | 元数据容器          | 无                           | `<head>...</head>`                        |
| `meta`            | 元信息              | `charset` `name` `content`   | `<meta charset="UTF-8" />`                |
| `title`           | 页面标题            | 无                           | `<title>页面</title>`                     |
| `link`            | 外部资源            | `rel` `href`                 | `<link rel="stylesheet" href="/a.css" />` |
| `style`           | 内联样式            | 无                           | `<style>.x{}</style>`                     |
| `base`            | 基础 URL            | `href` `target`              | `<base href="/" />`                       |
| `script`          | 脚本                | `src` `type` `defer` `async` | `<script src="/a.js" defer></script>`     |
| `body`            | 文档主体            | 无                           | `<body>...</body>`                        |

# 五、结构与分区标签

| 标签      | 作用               | 常用属性     | 最小示例                                 |
| --------- | ------------------ | ------------ | ---------------------------------------- |
| `header`  | 页头/区块头        | 全局属性     | `<header>站点头部</header>`              |
| `nav`     | 导航区             | `aria-label` | `<nav aria-label="主导航">...</nav>`     |
| `main`    | 主内容（通常唯一） | 全局属性     | `<main>...</main>`                       |
| `section` | 主题分节           | 全局属性     | `<section><h2>章节</h2></section>`       |
| `article` | 独立内容单元       | 全局属性     | `<article>文章内容</article>`            |
| `aside`   | 侧栏/补充内容      | 全局属性     | `<aside>相关推荐</aside>`                |
| `footer`  | 页脚/区块尾        | 全局属性     | `<footer>版权</footer>`                  |
| `address` | 联系信息           | 全局属性     | `<address>contact@example.com</address>` |
| `div`     | 无语义分组         | 全局属性     | `<div class="box"></div>`                |

# 六、文本语义标签

| 标签          | 作用          | 常用属性   | 最小示例                                              |
| ------------- | ------------- | ---------- | ----------------------------------------------------- |
| `h1`-`h6`     | 标题层级      | 全局属性   | `<h1>标题</h1>`                                       |
| `p`           | 段落          | 全局属性   | `<p>正文</p>`                                         |
| `span`        | 行内容器      | 全局属性   | `<span>片段</span>`                                   |
| `br`          | 换行          | 无         | `第一行<br />第二行`                                  |
| `hr`          | 主题分隔      | 无         | `<hr />`                                              |
| `strong`      | 重要强调      | 全局属性   | `<strong>重点</strong>`                               |
| `em`          | 语气强调      | 全局属性   | `<em>强调</em>`                                       |
| `small`       | 附属说明      | 全局属性   | `<small>补充说明</small>`                             |
| `mark`        | 高亮          | 全局属性   | `<mark>关键字</mark>`                                 |
| `abbr`        | 缩写          | `title`    | `<abbr title="HyperText Markup Language">HTML</abbr>` |
| `cite`        | 作品引用      | 全局属性   | `<cite>作品名</cite>`                                 |
| `q`           | 行内引用      | `cite`     | `<q>一句引用</q>`                                     |
| `blockquote`  | 块级引用      | `cite`     | `<blockquote>长引用</blockquote>`                     |
| `code`        | 代码片段      | 全局属性   | `<code>const a = 1</code>`                            |
| `pre`         | 预格式文本    | 全局属性   | `<pre>保留空白</pre>`                                 |
| `kbd`         | 键盘输入      | 全局属性   | `<kbd>Ctrl</kbd>`                                     |
| `samp`        | 程序输出      | 全局属性   | `<samp>ok</samp>`                                     |
| `var`         | 变量名        | 全局属性   | `<var>x</var>`                                        |
| `sub` / `sup` | 下标/上标     | 全局属性   | `H<sub>2</sub>O`                                      |
| `del` / `ins` | 删除/插入文本 | `datetime` | `<del>旧</del><ins>新</ins>`                          |

# 七、列表标签

| 标签 | 作用     | 常用属性           | 最小示例                            |
| ---- | -------- | ------------------ | ----------------------------------- |
| `ul` | 无序列表 | 无                 | `<ul><li>a</li></ul>`               |
| `ol` | 有序列表 | `start` `reversed` | `<ol start="3"><li>a</li></ol>`     |
| `li` | 列表项   | `value`(ol内)      | `<li>项</li>`                       |
| `dl` | 定义列表 | 无                 | `<dl><dt>词</dt><dd>释义</dd></dl>` |
| `dt` | 术语     | 无                 | `<dt>HTML</dt>`                     |
| `dd` | 描述     | 无                 | `<dd>标记语言</dd>`                 |

# 八、链接与资源标签

| 标签           | 作用           | 常用属性                               | 最小示例                                        |
| -------------- | -------------- | -------------------------------------- | ----------------------------------------------- |
| `a`            | 超链接         | `href` `target` `rel`                  | `<a href="/about">关于</a>`                     |
| `img`          | 图片           | `src` `alt` `width` `height` `loading` | `<img src="/a.webp" alt="图" />`                |
| `picture`      | 响应式图片容器 | 无                                     | `<picture>...</picture>`                        |
| `source`       | 媒体源         | `srcset` `type` `media`                | `<source srcset="/a.webp" type="image/webp" />` |
| `map` / `area` | 图像热点       | `name` `coords` `shape`                | `<map name="m"><area ... /></map>`              |

# 九、表格标签

| 标签                        | 作用           | 常用属性                    | 最小示例                                |
| --------------------------- | -------------- | --------------------------- | --------------------------------------- |
| `table`                     | 表格容器       | 全局属性                    | `<table>...</table>`                    |
| `caption`                   | 表格标题       | 无                          | `<caption>月报</caption>`               |
| `thead` / `tbody` / `tfoot` | 表头/表体/表尾 | 无                          | `<thead>...</thead>`                    |
| `tr`                        | 行             | 无                          | `<tr>...</tr>`                          |
| `th`                        | 表头单元格     | `scope` `colspan` `rowspan` | `<th scope="col">姓名</th>`             |
| `td`                        | 数据单元格     | `colspan` `rowspan`         | `<td>张三</td>`                         |
| `colgroup` / `col`          | 列分组/列样式  | `span`                      | `<colgroup><col span="2" /></colgroup>` |

# 十、表单标签

| 标签                  | 作用          | 常用属性                                       | 最小示例                                       |
| --------------------- | ------------- | ---------------------------------------------- | ---------------------------------------------- |
| `form`                | 表单容器      | `action` `method` `autocomplete`               | `<form method="post">...</form>`               |
| `label`               | 标签关联输入  | `for`                                          | `<label for="email">邮箱</label>`              |
| `input`               | 输入控件      | `type` `name` `value` `placeholder` `required` | `<input type="email" />`                       |
| `textarea`            | 多行输入      | `rows` `cols` `maxlength`                      | `<textarea rows="4"></textarea>`               |
| `select`              | 下拉选择      | `name` `multiple`                              | `<select><option>A</option></select>`          |
| `option` / `optgroup` | 选项/选项组   | `value` `label`                                | `<option value="1">一</option>`                |
| `button`              | 按钮          | `type` `disabled`                              | `<button type="submit">提交</button>`          |
| `fieldset` / `legend` | 字段分组/标题 | `disabled`                                     | `<fieldset><legend>账户</legend></fieldset>`   |
| `datalist`            | 输入建议列表  | `id`                                           | `<datalist id="city">...</datalist>`           |
| `output`              | 计算输出      | `for`                                          | `<output>42</output>`                          |
| `progress`            | 进度          | `value` `max`                                  | `<progress value="30" max="100"></progress>`   |
| `meter`               | 标量范围      | `min` `max` `low` `high`                       | `<meter min="0" max="100" value="60"></meter>` |

# 十一、媒体与嵌入标签

| 标签               | 作用         | 常用属性                            | 最小示例                                        |
| ------------------ | ------------ | ----------------------------------- | ----------------------------------------------- |
| `audio`            | 音频         | `src` `controls` `autoplay` `loop`  | `<audio controls src="/a.mp3"></audio>`         |
| `video`            | 视频         | `src` `controls` `poster` `preload` | `<video controls src="/a.mp4"></video>`         |
| `track`            | 字幕轨道     | `kind` `src` `srclang` `label`      | `<track kind="subtitles" ... />`                |
| `iframe`           | 内嵌页面     | `src` `title` `loading` `allow`     | `<iframe src="/" title="frame"></iframe>`       |
| `embed`            | 外部资源     | `src` `type`                        | `<embed src="/a.pdf" type="application/pdf" />` |
| `object` / `param` | 对象嵌入     | `data` `type`                       | `<object data="/a.svg"></object>`               |
| `canvas`           | 位图绘制区域 | `width` `height`                    | `<canvas width="300" height="150"></canvas>`    |
| `svg`              | 矢量图容器   | `viewBox`                           | `<svg viewBox="0 0 100 100"></svg>`             |
| `math`             | 数学公式容器 | MathML属性                          | `<math>...</math>`                              |

# 十二、交互与披露标签

| 标签      | 作用           | 常用属性 | 最小示例                                         |
| --------- | -------------- | -------- | ------------------------------------------------ |
| `details` | 折叠详情       | `open`   | `<details><summary>更多</summary>内容</details>` |
| `summary` | `details` 标题 | 无       | `<summary>点击展开</summary>`                    |
| `dialog`  | 对话框         | `open`   | `<dialog open>提示</dialog>`                     |
| `menu`    | 菜单语义容器   | 全局属性 | `<menu><li>项</li></menu>`                       |

# 十三、脚本与模板标签

| 标签       | 作用                | 常用属性                     | 最小示例                                      |
| ---------- | ------------------- | ---------------------------- | --------------------------------------------- |
| `script`   | 脚本                | `src` `type` `defer` `async` | `<script type="module" src="/a.js"></script>` |
| `noscript` | 无脚本回退          | 无                           | `<noscript>请开启 JS</noscript>`              |
| `template` | 惰性模板片段        | 无                           | `<template id="tpl"><li></li></template>`     |
| `slot`     | Web Components 插槽 | `name`                       | `<slot name="title"></slot>`                  |

# 十四、全局属性速查

几乎所有元素都可使用：

- `id`
- `class`
- `style`
- `title`
- `lang`
- `dir`
- `hidden`
- `tabindex`
- `contenteditable`
- `draggable`
- `data-*`
- `aria-*`

# 十五、最小完整模板

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HTML 手册示例</title>
    <meta name="description" content="HTML 标签手册示例页面" />
  </head>
  <body>
    <header>Header</header>
    <main>
      <article>
        <h1>标题</h1>
        <p>正文</p>
      </article>
    </main>
    <footer>Footer</footer>
  </body>
</html>
```

# 十六、使用建议

- 优先语义化标签，最后才用 `div`。
- 图片必须写 `alt`，并尽量写尺寸。
- 表单控件要和 `label` 关联。
- 有交互就优先原生控件（如 `button`、`a`）。
