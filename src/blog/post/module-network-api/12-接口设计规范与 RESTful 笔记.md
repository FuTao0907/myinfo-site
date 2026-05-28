---
title: 接口设计规范与 RESTful 笔记
date: 2026/05/19
desc: 只讲接口设计边界，包括资源建模、URL 规则、方法语义、分页结构、统一响应和版本化，不再重复状态码细节和请求基础。
tags: ['#网络与接口', '#全部', '#接口设计', '#RESTful']
cover: https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" width=600 />

<small>这篇只讲接口怎么设计，不再重复讲 HTTP 状态码和错误处理细节。</small>

# 一、路径表达资源，方法表达动作

推荐：

```text
GET /articles
GET /articles/1
POST /articles
PATCH /articles/1
DELETE /articles/1
```

不推荐：

```text
POST /getArticles
POST /createArticle
POST /updateArticle
```

- 原理总结：URL 尽量表达“对象是谁”，Method 表达“对它做什么”。
- 注意点：不要把所有动作都塞进路径名。

# 二、参数放哪里

- 路径参数：标识资源身份。
- 查询参数：分页、搜索、排序、过滤。
- 请求体：提交资源内容。

# 三、分页结构统一

```json
{
  "data": {
    "list": [],
    "total": 100,
    "page": 1,
    "pageSize": 10
  }
}
```

- 原理总结：分页结构统一后，前端分页组件和类型都能复用。
- 注意点：字段名一旦定了就全项目统一。

# 四、统一响应结构

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

- 原理总结：统一响应结构有利于前端封装和错误提示。
- 注意点：统一响应结构不等于所有接口都返回 200。

# 五、版本化

```text
/api/v1/users
/api/v2/users
```

- 原理总结：旧客户端和新客户端并存时，要给演进留出口。
- 注意点：版本升级前先定义清楚兼容策略。
