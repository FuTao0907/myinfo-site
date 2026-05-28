---
title: Cookie Session Token JWT 笔记
date: 2026/05/19
desc: 只讲认证与会话机制本身，统一梳理 Cookie、Session、Token、JWT 的关系、区别和选型，不再重复跨域或状态码话题。
tags: ['#网络与接口', '#全部', '#鉴权', '#HTTP']
cover: https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=2073&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=2073&auto=format&fit=crop" width=600 />

<small>这篇只讲会话和认证机制，不把跨域、缓存、状态码再混进来。</small>

# 一、四个概念先分层

| 概念 | 它是什么 |
| --- | --- |
| Cookie | 浏览器存和带数据的一种机制 |
| Session | 服务端保存登录态的一种机制 |
| Token | 认证凭证的统称 |
| JWT | Token 的一种具体格式 |

# 二、最常见两种思路

## 1. Session 方案

```text
用户登录
-> 服务端创建 session
-> 把 session id 放进 cookie
-> 浏览器后续自动带 cookie
-> 服务端根据 session id 找回登录态
```

## 2. Token 方案

```text
用户登录
-> 服务端返回 token
-> 前端保存 token
-> 后续请求把 token 放进 Authorization 头
-> 服务端校验 token
```

# 三、JWT 只是什么

```text
JWT = Header.Payload.Signature
```

- 原理总结：JWT 是一种可签名的 token 格式，不等于所有 token。
- 注意点：JWT 默认可读，不要把敏感明文直接放进 payload。

# 四、最容易混淆的点

- Cookie 不是 Session。
- Token 不是 JWT 的同义词。
- Cookie 和 Token 不是天然对立关系。
- 前端是否存 token，不代表服务端就能省掉权限校验。
