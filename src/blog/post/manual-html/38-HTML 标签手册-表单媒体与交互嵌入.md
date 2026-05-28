---
title: HTML 标签手册：表单媒体与交互嵌入
date: 2026/05/19
desc: 逐条整理 HTML 表单、表格、媒体、交互和嵌入类标签，包含常用属性与示例，适合作为开发查询手册。
tags: ['#HTML手册', '#全部', '#HTML', '#手册']
cover: https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 2：聚焦表单、媒体、交互和嵌入标签。</small>

# 一、表单容器与输入控件

## 1. `form`

- 作用：提交数据容器。
- 常用属性：`action`、`method`、`autocomplete`、`novalidate`。

```html
<form action="/submit" method="post">
  ...
</form>
```

## 2. `label`

- 作用：绑定输入控件，提升可访问性。
- 常用属性：`for`。

```html
<label for="email">邮箱</label>
<input id="email" type="email" />
```

## 3. `input`

- 作用：单行输入控件。
- 常用属性：`type`、`name`、`value`、`placeholder`、`required`、`disabled`。
- 常用类型：`text`、`email`、`password`、`number`、`date`、`file`、`checkbox`、`radio`。

```html
<input type="text" name="username" required />
<input type="file" accept="image/*" />
```

## 4. `textarea`

- 作用：多行文本输入。
- 常用属性：`rows`、`cols`、`maxlength`。

```html
<textarea rows="4" maxlength="200"></textarea>
```

## 5. `select` `option` `optgroup`

```html
<select name="city">
  <optgroup label="华北">
    <option value="bj">北京</option>
  </optgroup>
</select>
```

## 6. `button`

- 常用属性：`type`（`button`/`submit`/`reset`）、`disabled`。

```html
<button type="submit">提交</button>
```

## 7. `fieldset` `legend`

```html
<fieldset>
  <legend>账户信息</legend>
  <input type="text" />
</fieldset>
```

## 8. `datalist` `output` `progress` `meter`

```html
<input list="browsers" />
<datalist id="browsers">
  <option value="Chrome"></option>
</datalist>

<progress value="30" max="100"></progress>
<meter min="0" max="100" value="70"></meter>
```

# 二、表格标签

- `table`：表格容器
- `caption`：标题
- `thead` `tbody` `tfoot`：分区
- `tr`：行
- `th`：表头单元格
- `td`：普通单元格

```html
<table>
  <caption>销售报表</caption>
  <thead>
    <tr>
      <th scope="col">姓名</th>
      <th scope="col">金额</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>张三</td>
      <td>100</td>
    </tr>
  </tbody>
</table>
```

# 三、图片与响应式资源

## 1. `img`

- 常用属性：`src`、`alt`、`width`、`height`、`loading`、`decoding`。

```html
<img src="/cover.webp" alt="封面图" width="640" height="360" loading="lazy" decoding="async" />
```

## 2. `picture` `source`

```html
<picture>
  <source media="(max-width: 768px)" srcset="/mobile.webp" />
  <img src="/desktop.webp" alt="横幅" />
</picture>
```

# 四、音视频标签

## 1. `audio`

```html
<audio controls src="/audio/demo.mp3"></audio>
```

## 2. `video` `source` `track`

```html
<video controls preload="metadata" poster="/poster.webp">
  <source src="/video/demo.mp4" type="video/mp4" />
  <track kind="subtitles" srclang="zh" src="/subtitles.vtt" label="中文" />
</video>
```

# 五、交互标签

## 1. `details` `summary`

```html
<details>
  <summary>查看更多</summary>
  详细内容...
</details>
```

## 2. `dialog`

```html
<dialog open>提示信息</dialog>
```

# 六、嵌入与绘图标签

## 1. `iframe`

```html
<iframe src="https://example.com" title="外部页面" loading="lazy"></iframe>
```

## 2. `embed` `object`

```html
<embed src="/file.pdf" type="application/pdf" />
<object data="/vector.svg" type="image/svg+xml"></object>
```

## 3. `canvas` `svg`

```html
<canvas id="chart" width="300" height="150"></canvas>
<svg viewBox="0 0 100 100"></svg>
```

# 七、脚本模板与插槽标签

## 1. `template`

```html
<template id="item-template">
  <li class="item"></li>
</template>
```

## 2. `slot`（Web Components）

```html
<slot name="title"></slot>
```

# 八、常见注意点

- 表单控件要配 `label`。
- 图片必须有 `alt`。
- 视频尽量配 `poster` 和 `track`。
- `iframe` 要写 `title`，并评估安全策略。
- `dialog` 需要结合脚本控制打开和关闭。
