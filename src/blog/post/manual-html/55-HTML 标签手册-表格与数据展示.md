---
title: HTML 标签手册：表格与数据展示
date: 2026/05/19
desc: 系统整理 HTML 表格相关标签与数据展示语义，包括 table、caption、thead、tbody、tfoot、tr、th、td、colgroup 和 col 的用法与示例。
tags: ['#HTML手册', '#全部', '#HTML', '#手册']
cover: https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 7：专门整理表格和结构化数据展示标签，适合做后台、报表和数据表格时查阅。</small>

# 一、表格基础结构

| 标签 | 作用 | 常用属性 | 最小示例 |
| --- | --- | --- | --- |
| `table` | 表格容器 | 全局属性 | `<table>...</table>` |
| `caption` | 表格标题 | 无 | `<caption>月度报表</caption>` |
| `thead` | 表头分组 | 无 | `<thead>...</thead>` |
| `tbody` | 表体分组 | 无 | `<tbody>...</tbody>` |
| `tfoot` | 表尾分组 | 无 | `<tfoot>...</tfoot>` |
| `tr` | 表格行 | 无 | `<tr>...</tr>` |
| `th` | 表头单元格 | `scope` `rowspan` `colspan` | `<th scope="col">姓名</th>` |
| `td` | 普通单元格 | `rowspan` `colspan` | `<td>张三</td>` |
| `colgroup` | 列分组 | `span` | `<colgroup>...</colgroup>` |
| `col` | 列定义 | `span` | `<col span="2" />` |

# 二、完整表格示例

```html
<table>
  <caption>销售报表</caption>
  <thead>
    <tr>
      <th scope="col">姓名</th>
      <th scope="col">部门</th>
      <th scope="col">金额</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>张三</td>
      <td>运营</td>
      <td>1000</td>
    </tr>
    <tr>
      <td>李四</td>
      <td>产品</td>
      <td>1200</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="2">总计</td>
      <td>2200</td>
    </tr>
  </tfoot>
</table>
```

# 三、`th` 与 `scope`

`th` 不只是粗体单元格，更是语义上的表头。

常见 `scope`：

- `col`：列标题
- `row`：行标题
- `colgroup`
- `rowgroup`

```html
<tr>
  <th scope="row">第一季度</th>
  <td>1200</td>
</tr>
```

- 原理总结：`scope` 帮助读屏器理解表头和数据单元格之间的关系。
- 注意点：复杂表格里语义信息比视觉样式更重要。

# 四、合并单元格

## 1. `colspan`

```html
<td colspan="2">跨两列</td>
```

## 2. `rowspan`

```html
<td rowspan="2">跨两行</td>
```

- 注意点：跨行跨列会让结构更复杂，开发前最好先画好表格结构图。

# 五、列分组 `colgroup` 和 `col`

```html
<table>
  <colgroup>
    <col style="width: 180px" />
    <col style="width: 120px" />
    <col style="width: 140px" />
  </colgroup>
  ...
</table>
```

- 作用：统一描述整列的宽度或样式。
- 注意点：`col` 能控制列级属性，但不能替代所有单元格样式控制。

# 六、数据展示语义建议

- 有表头就用 `th`，不要全写成 `td`。
- 有总结信息就用 `caption`。
- 有表头/表体/表尾分组时，尽量用 `thead` `tbody` `tfoot`。
- 复杂表格优先保证语义和可访问性，而不是只顾样式。

# 七、常见误区

- 用一堆 `div` 模拟表格展示结构化数据
- 表头单元格不用 `th`
- 报表类内容没有 `caption`
- 大量跨行跨列但不整理结构，后期难维护
