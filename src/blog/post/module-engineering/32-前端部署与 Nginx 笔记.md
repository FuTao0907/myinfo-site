---
title: 前端部署与 Nginx 笔记
date: 2026/05/19
desc: 按模板方式整理前端部署里最常用的操作和 Nginx 配置，包括打包、静态资源缓存、gzip、反向代理和刷新回退。
tags: ['#工程化', '#全部', '#部署', '#Nginx']
cover: https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" width=600 />

<small>部署最适合做模板，这篇只留以后最常会复制修改的配置。</small>

# 一、基础部署流程

```bash
yarn install
yarn build
yarn start
```

- 原理总结：先装依赖，再构建产物，最后启动服务。
- 注意点：部署前最好先本地跑一次构建确认没报错。

# 二、静态资源缓存

```nginx
location ~* \.(js|css|png|jpg|jpeg|webp|svg|woff2)$ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}
```

- 原理总结：给稳定资源长缓存，减少重复下载。
- 注意点：长缓存必须配合 hash 文件名。

# 三、gzip 与代理

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;

location /api/ {
  proxy_pass http://127.0.0.1:3001/;
}
```

- 原理总结：gzip 压缩文本资源，反向代理把请求转给后端。
- 注意点：代理路径拼接规则要先测，不然很容易多一层或少一层路径。

# 四、刷新回退

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

- 原理总结：当前端路由刷新找不到真实文件时，统一回退到入口页。
- 注意点：这类配置主要适合纯 SPA 场景。
