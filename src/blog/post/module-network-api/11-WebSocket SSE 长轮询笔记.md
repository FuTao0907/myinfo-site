---
title: WebSocket SSE 长轮询笔记
date: 2026/05/19
desc: 只讲实时通信方案的差异和选型，包括轮询、长轮询、SSE、WebSocket 的适用场景、优缺点和连接管理。
tags: ['#网络与接口', '#全部', '#WebSocket', '#实时通信']
cover: https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=2069&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=2069&auto=format&fit=crop" width=600 />

<small>这篇只讲几种实时通信方案怎么选，不再重复 HTTP 请求基础。</small>

# 一、四种方案速查

| 方案 | 特点 | 适合场景 |
| --- | --- | --- |
| 轮询 | 简单，但请求浪费多 | 简单状态刷新 |
| 长轮询 | 比轮询省请求 | 消息量不高的通知 |
| SSE | 服务端单向推送 | 日志流、通知流 |
| WebSocket | 全双工长连接 | 聊天、协作、实时互动 |

# 二、长轮询

```text
客户端发请求
-> 服务端没数据就挂起
-> 有数据后立即返回
-> 客户端收到后再发下一次请求
```

- 原理总结：本质还是 HTTP，只是服务端延迟响应。
- 注意点：并发多时服务端连接占用会变重。

# 三、SSE

```text
客户端建立 HTTP 连接
-> 服务端持续通过同一连接往下推文本事件流
```

- 原理总结：SSE 是服务端到客户端单向推送，基于 HTTP。
- 注意点：如果你需要双向频繁通信，SSE 就不够用了。

# 四、WebSocket

```text
先通过 HTTP 握手
-> 升级协议
-> 建立双向长连接
-> 两端随时主动发消息
```

- 原理总结：WebSocket 适合高频双向实时交互。
- 注意点：心跳、重连、断线恢复和鉴权都要提前设计。
