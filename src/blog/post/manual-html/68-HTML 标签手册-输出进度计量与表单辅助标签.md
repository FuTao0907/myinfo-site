---
title: HTML 标签手册：输出、进度、计量与表单辅助标签
date: 2026/05/19
desc: 系统整理 HTML 中 output、progress、meter、datalist 等表单辅助标签的用途、常用属性与示例，适合作为查询手册。
tags: ['#HTML手册', '#全部', '#HTML', '#手册']
cover: https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 12：专门整理表单辅助和状态展示类标签。</small>

# 一、`output`

- 作用：显示计算结果或表单联动结果。
- 常用属性：`for`、`name`

```html
<form oninput="result.value = Number(a.value) + Number(b.value)">
  <input id="a" type="number" value="1" />
  <input id="b" type="number" value="2" />
  <output name="result" for="a b">3</output>
</form>
```

- 原理总结：`output` 语义上表示“结果输出”，比普通 `span` 更清晰。

# 二、`progress`

- 作用：表示任务进度。
- 常用属性：
- `value`
- `max`

```html
<progress value="30" max="100"></progress>
```

无明确进度时：

```html
<progress></progress>
```

- 适用场景：
- 文件上传进度
- 加载任务进度
- 步骤完成度

# 三、`meter`

- 作用：表示某个范围内的度量值，不是“任务进度”。
- 常用属性：
- `min`
- `max`
- `low`
- `high`
- `optimum`
- `value`

```html
<meter min="0" max="100" low="30" high="80" optimum="90" value="65"></meter>
```

- 适用场景：
- 电量
- 温度
- 评分
- 健康度

- 注意点：`meter` 表示“当前值在范围中的位置”，`progress` 表示“任务完成进度”。

# 四、`datalist`

- 作用：给输入框提供建议值列表。
- 常用属性：`id`

```html
<input list="city-list" name="city" />

<datalist id="city-list">
  <option value="北京"></option>
  <option value="上海"></option>
  <option value="广州"></option>
</datalist>
```

- 注意点：`datalist` 只是建议，不等于下拉选择约束。

# 五、辅助使用示例

```html
<form oninput="scoreOutput.value = score.value">
  <label for="score">当前评分</label>
  <input id="score" type="range" min="0" max="100" value="60" />
  <output name="scoreOutput" for="score">60</output>
</form>
```

```html
<label for="browser">浏览器</label>
<input id="browser" list="browser-list" />
<datalist id="browser-list">
  <option value="Chrome"></option>
  <option value="Edge"></option>
  <option value="Firefox"></option>
</datalist>
```

# 六、常见误区

- 把 `meter` 当成进度条使用
- `output` 和普通文本标签混用但不表达结果语义
- 误以为 `datalist` 能完全替代 `select`
