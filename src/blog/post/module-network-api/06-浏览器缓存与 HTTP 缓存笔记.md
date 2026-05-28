---
title: 浏览器缓存与 HTTP 缓存笔记
date: 2026/05/19
desc: 只讲缓存本身，包括强缓存、协商缓存、常见缓存头和静态资源缓存策略，不再重复 HTTP 总览内容。
tags: ['#网络与接口', '#全部', '#缓存', '#HTTP']
cover: https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>这篇只讲缓存，不再重复请求链路、鉴权和跨域。</small>

# 一、缓存速查

| 类型 | 特点 |
| --- | --- |
| 强缓存 | 命中时浏览器直接复用，不发请求 |
| 协商缓存 | 会发请求，由服务端决定是否返回 304 |

# 二、强缓存

```http
Cache-Control: public, max-age=3600
```

- 原理总结：资源在 `max-age` 期间内直接视为有效。
- 注意点：适合静态资源，不适合频繁变化的接口数据。

# 三、协商缓存

```http
ETag: "abc123"
If-None-Match: "abc123"
```

```http
Last-Modified: Wed, 19 May 2026 08:00:00 GMT
If-Modified-Since: Wed, 19 May 2026 08:00:00 GMT
```

- 原理总结：浏览器带着旧资源标记询问服务端“资源变没变”。
- 注意点：精度和可靠性上，`ETag` 通常比 `Last-Modified` 更稳。

# 四、最常用的静态资源策略

```nginx
location ~* \.(js|css|png|jpg|jpeg|webp|svg|woff2)$ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}
```

- 原理总结：稳定静态资源走长缓存，更新依赖文件名 hash 失效。
- 注意点：没有 hash 的资源不要随便给一年缓存。

# 五、容易混淆的点

- `no-store`：完全不存。
- `no-cache`：可以存，但使用前必须重新验证。
- `304` 不是报错，是协商缓存命中。
