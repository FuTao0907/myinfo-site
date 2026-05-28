---
title: 前端请求与 HTTP 总览笔记
date: 2026/05/19
desc: 作为请求专题的总览入口，统一梳理请求链路、HTTP 方法、报文结构、HTTPS 和排查顺序；缓存、鉴权、跨域、状态码等专题不在这里重复展开。
tags: ['#网络与接口', '#全部', '#HTTP', '#网络请求']
cover: https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>这篇只做总览，不把缓存、鉴权、跨域、状态码再展开重复讲。</small>

# 一、这篇的边界

- 这篇只讲请求总流程、HTTP 基础结构和排查顺序。
- 缓存看 `06`。
- 鉴权看 `07`。
- 跨域看 `08`。
- 状态码和错误处理看 `09`。

# 二、请求链路速查

```text
输入 URL
-> DNS 解析
-> 建立 TCP 连接
-> HTTPS 场景下进行 TLS 握手
-> 发送 HTTP 请求
-> 服务端处理
-> 返回 HTTP 响应
-> 浏览器解析并渲染
```

- 原理总结：前端看到的“请求”，背后其实是一整条网络链路。
- 注意点：请求慢不一定是接口慢，也可能卡在 DNS、连接、TLS 或资源解析阶段。

# 三、请求报文结构

```http
POST /api/articles?page=1 HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer token

{"title":"hello"}
```

- 请求行：方法 + 路径 + 协议版本。
- 请求头：描述元信息。
- 请求体：提交真实数据。

# 四、响应报文结构

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"code":0,"message":"success","data":[]}
```

- 状态行：协议版本 + 状态码。
- 响应头：描述返回内容和缓存等信息。
- 响应体：真正的数据。

# 五、方法速查

| 方法 | 用途 |
| --- | --- |
| GET | 读取资源 |
| POST | 提交数据 / 创建资源 |
| PUT | 整体替换 |
| PATCH | 局部更新 |
| DELETE | 删除资源 |

- 原理总结：路径尽量表达资源，方法尽量表达动作。
- 注意点：不要把所有接口都写成 POST。

# 六、排查顺序

1. 先看 URL 对不对。
2. 再看 Method 对不对。
3. 再看 Header 对不对。
4. 再看 Body / Query 对不对。
5. 再看状态码和响应体。
6. 最后区分是浏览器限制、网络问题还是服务端问题。

# 七、这篇不再重复的专题

- 缓存：见 `06-浏览器缓存与 HTTP 缓存笔记`
- Cookie / Session / Token / JWT：见 `07-Cookie Session Token JWT 笔记`
- CORS：见 `08-CORS 与跨域问题排查笔记`
- 状态码与错误处理：见 `09-HTTP 状态码与接口错误处理笔记`
