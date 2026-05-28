---
title: CORS 与跨域问题排查笔记
date: 2026/05/19
desc: 只讲同源策略、CORS、预检请求、凭证请求和跨域排查步骤，不再重复鉴权、状态码和请求总览。
tags: ['#网络与接口', '#全部', '#CORS', '#跨域']
cover: https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>这篇只讲浏览器跨域，不把鉴权和状态码混进来。</small>

# 一、先明确什么叫跨源

判断是否同源看三项：

- 协议
- 域名
- 端口

三项都相同，才算同源。

# 二、最常见 CORS 头

```http
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

- 原理总结：服务端通过这些头告诉浏览器“哪些跨源请求可以放行”。
- 注意点：带凭证时 `Allow-Origin` 不能写 `*`。

# 三、预检请求

```http
OPTIONS /api/user HTTP/1.1
Origin: http://localhost:3000
Access-Control-Request-Method: POST
```

- 原理总结：复杂跨域请求前，浏览器会先发 `OPTIONS` 询问服务端。
- 注意点：预检失败时，真正业务请求可能根本不会发出去。

# 四、排查顺序

1. 先确认是不是浏览器跨源限制。
2. 再看 `Network` 里有没有 `OPTIONS`。
3. 再看服务端 CORS 头是否完整。
4. 如果带 cookie，再确认是否允许凭证。
