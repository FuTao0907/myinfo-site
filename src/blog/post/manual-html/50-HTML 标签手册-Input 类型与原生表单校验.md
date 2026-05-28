---
title: HTML 标签手册：Input 类型与原生表单校验
date: 2026/05/19
desc: 系统整理 input 的常见 type、原生表单校验属性和使用示例，覆盖文本、数字、日期、文件、勾选和提交相关场景，适合作为查询手册。
tags: ['#HTML手册', '#全部', '#HTML', '#手册']
cover: https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 6：把 `input` 的类型和原生表单校验能力拆开专门整理，方便写表单时直接查。</small>

# 一、文本输入类型

| type | 作用 | 示例 |
| --- | --- | --- |
| `text` | 普通文本 | `<input type="text" />` |
| `search` | 搜索输入 | `<input type="search" />` |
| `email` | 邮箱输入 | `<input type="email" />` |
| `url` | URL 输入 | `<input type="url" />` |
| `tel` | 电话输入 | `<input type="tel" />` |
| `password` | 密码输入 | `<input type="password" />` |

```html
<label for="email">邮箱</label>
<input id="email" name="email" type="email" required placeholder="name@example.com" />
```

# 二、数字与范围类型

| type | 作用 | 示例 |
| --- | --- | --- |
| `number` | 数值输入 | `<input type="number" min="0" max="100" />` |
| `range` | 范围滑块 | `<input type="range" min="0" max="100" value="50" />` |

常用属性：

- `min`
- `max`
- `step`

# 三、日期与时间类型

| type | 作用 | 示例 |
| --- | --- | --- |
| `date` | 日期 | `<input type="date" />` |
| `time` | 时间 | `<input type="time" />` |
| `datetime-local` | 本地日期时间 | `<input type="datetime-local" />` |
| `month` | 月份 | `<input type="month" />` |
| `week` | 周 | `<input type="week" />` |

# 四、选择与状态类型

| type | 作用 | 示例 |
| --- | --- | --- |
| `checkbox` | 复选框 | `<input type="checkbox" />` |
| `radio` | 单选框 | `<input type="radio" name="gender" />` |
| `color` | 颜色选择 | `<input type="color" />` |

```html
<label><input type="checkbox" name="agree" required /> 我已阅读协议</label>
```

# 五、文件与隐藏类型

| type | 作用 | 示例 |
| --- | --- | --- |
| `file` | 选择文件 | `<input type="file" accept="image/*" />` |
| `hidden` | 隐藏字段 | `<input type="hidden" name="token" value="abc" />` |

文件上传示例：

```html
<input type="file" accept="image/*,.pdf" multiple />
```

常用属性：

- `accept`
- `multiple`

# 六、按钮相关类型

| type | 作用 | 示例 |
| --- | --- | --- |
| `submit` | 提交表单 | `<input type="submit" value="提交" />` |
| `reset` | 重置表单 | `<input type="reset" value="重置" />` |
| `button` | 普通按钮 | `<input type="button" value="点击" />` |

- 注意点：实际开发里更常用 `button` 标签代替 `input type="button"`。

# 七、通用属性

| 属性 | 作用 | 示例 |
| --- | --- | --- |
| `name` | 字段名 | `<input name="username" />` |
| `value` | 默认值 | `<input value="Tom" />` |
| `placeholder` | 占位文本 | `<input placeholder="请输入" />` |
| `required` | 必填 | `<input required />` |
| `disabled` | 禁用 | `<input disabled />` |
| `readonly` | 只读 | `<input readonly />` |
| `autocomplete` | 自动完成 | `<input autocomplete="email" />` |
| `maxlength` / `minlength` | 长度限制 | `<input maxlength="20" />` |
| `pattern` | 正则校验 | `<input pattern="[A-Za-z]{3,}" />` |
| `inputmode` | 输入法提示 | `<input inputmode="numeric" />` |
| `list` | 关联 datalist | `<input list="city-list" />` |

# 八、原生表单校验

## 1. 常见校验属性

- `required`
- `min`
- `max`
- `step`
- `minlength`
- `maxlength`
- `pattern`

```html
<form>
  <input type="email" required />
  <input type="password" minlength="8" required />
  <input type="number" min="1" max="10" />
  <button type="submit">提交</button>
</form>
```

## 2. 原生校验状态

- `:valid`
- `:invalid`
- `:required`
- `:optional`

## 3. 关闭浏览器原生校验

```html
<form novalidate></form>
```

# 九、`datalist` 输入建议

```html
<input list="city-list" name="city" />
<datalist id="city-list">
  <option value="北京"></option>
  <option value="上海"></option>
</datalist>
```

# 十、表单实践建议

- 重要表单字段始终搭配 `label`。
- 能用原生 type 就不要全写成 `text`。
- 校验规则在前端和后端都要存在。
- 文件上传前仍要在 JavaScript 中补充类型、大小校验。
