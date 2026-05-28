---
title: HTML 标签手册：文本域、选择控件与字段分组
date: 2026/05/19
desc: 系统整理 HTML 表单中 textarea、select、option、optgroup、fieldset、legend 等标签的用途、属性和示例，适合作为查询手册。
tags: ['#HTML手册', '#全部', '#HTML', '#手册']
cover: https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 11：专门整理表单里除了 `input` 之外最常用的输入和分组标签。</small>

# 一、`textarea`

- 作用：多行文本输入。
- 常用属性：
- `name`
- `rows`
- `cols`
- `maxlength`
- `placeholder`
- `required`

```html
<label for="bio">简介</label>
<textarea id="bio" name="bio" rows="4" maxlength="200" placeholder="请输入简介"></textarea>
```

- 注意点：
- `textarea` 的默认值写在标签内容里，不是 `value` 属性里。

# 二、`select`

- 作用：下拉选择控件。
- 常用属性：
- `name`
- `multiple`
- `required`
- `disabled`

```html
<label for="city">城市</label>
<select id="city" name="city">
  <option value="beijing">北京</option>
  <option value="shanghai">上海</option>
</select>
```

## 多选

```html
<select name="skills" multiple>
  <option value="html">HTML</option>
  <option value="css">CSS</option>
  <option value="js">JavaScript</option>
</select>
```

# 三、`option`

- 作用：`select` 或 `datalist` 中的选项。
- 常用属性：
- `value`
- `selected`
- `disabled`
- `label`

```html
<option value="1" selected>默认选中项</option>
```

# 四、`optgroup`

- 作用：给选项分组。
- 常用属性：`label`、`disabled`

```html
<select name="region">
  <optgroup label="华北">
    <option value="bj">北京</option>
  </optgroup>
  <optgroup label="华东">
    <option value="sh">上海</option>
  </optgroup>
</select>
```

# 五、`fieldset`

- 作用：表单字段分组。
- 常用属性：`disabled`、`name`

```html
<fieldset>
  <legend>账户信息</legend>
  <label for="username">用户名</label>
  <input id="username" type="text" />
</fieldset>
```

- 原理总结：`fieldset` 用来表达一组逻辑相关字段。
- 注意点：复杂表单用分组可以明显提升可读性和可访问性。

# 六、`legend`

- 作用：`fieldset` 的标题。
- 最佳实践：作为 `fieldset` 的第一个子元素。

```html
<fieldset>
  <legend>联系方式</legend>
  <input type="email" />
</fieldset>
```

# 七、推荐组合模板

```html
<form>
  <fieldset>
    <legend>基本信息</legend>

    <label for="desc">描述</label>
    <textarea id="desc" name="desc" rows="4"></textarea>

    <label for="level">等级</label>
    <select id="level" name="level">
      <option value="junior">初级</option>
      <option value="mid">中级</option>
      <option value="senior">高级</option>
    </select>
  </fieldset>
</form>
```

# 八、常见误区

- 把大量有关联的字段平铺在一起，不做 `fieldset` 分组
- `textarea` 误写成 `value=""`
- `select` 没有默认选项也没有占位提示，导致体验差
