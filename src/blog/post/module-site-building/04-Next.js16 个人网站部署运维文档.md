---
title: Next.js16 个人网站部署与运维文档
date: 2026/05/15
desc: 记录当前个人网站从本地打包、服务器部署、Nginx 反向代理到日常更新维护的完整流程，方便后续自用查阅。
tags: ['#网站建设', '#全部', '#Next.js', '#部署运维']
cover: https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>把部署流程写清楚，比每次上线时临时回忆命令更可靠。</small>

# Next.js16 个人网站部署与运维文档

## 一、服务器基础环境

| 软件/环境 | 版本                      |
| --------- | ------------------------- |
| 操作系统  | Ubuntu                    |
| Node.js   | 22.22.2                   |
| Nginx     | 1.26.3                    |
| MySQL     | 8.0.45                    |
| 前端框架  | Next.js 16.2.6 + React 19 |

### 项目信息

- 项目路径：`/www/wwwroot/myinfo/myinfo-site`
- 运行端口：`3000`
- 公网访问地址：`http://8.147.235.84`
- 运行方式：`nohup` 后台常驻，无 PM2

---

## 二、首次部署流程

### 1. 本地操作

1. 本地开发完成后，先确认功能和页面正常。
2. 执行生产打包命令：

```bash
npm run build
```

### 2. 服务器上传

1. 上传完整项目文件夹，不要只上传 `.next`。
2. 服务器存放路径保持为：`/www/wwwroot/myinfo/myinfo-site`

### 3. 服务器终端部署命令

```bash
# 进入项目目录
cd /www/wwwroot/myinfo/myinfo-site

# 安装依赖（解决 React 19 依赖冲突）
npm install --legacy-peer-deps

# 生产环境打包
npm run build

# 后台静默常驻启动
nohup npm run start > next.log 2>&1
```

### 4. 宝塔 Nginx 配置

站点类型：纯静态 / 无 PHP

配置文件示例：

```nginx
server {
    listen 80;
    server_name 8.147.235.84;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 三、日常项目更新流程

### 1. 本地更新

1. 修改代码、页面或功能。
2. 本地执行打包验证：

```bash
npm run build
```

3. 覆盖上传完整项目文件到服务器。

### 2. 服务器更新

一键更新命令如下，直接复制执行即可：

```bash
cd /www/wwwroot/myinfo/myinfo-site
pkill -f "npm run start"
npm install --legacy-peer-deps
npm run build
nohup npm run start > next.log 2>&1
```

执行完成后，刷新网页即可看到最新版本。

---

## 四、常用运维命令

```bash
# 查看项目是否运行
ps aux | grep "npm run start"

# 停止项目进程
pkill -f "npm run start"

# 前台临时启动（调试用，关闭终端就停）
npm run start

# 查看运行日志
cat next.log

# 清空日志
> next.log
```

---

## 五、常见报错与解决方案

### 1. Permission denied 权限不足

原因：宝塔的 `.user.ini` 处于锁定保护状态。  
结论：一般无需处理，不影响项目运行。

### 2. 打开网站出现 502 Bad Gateway

- 检查 3000 端口对应的 Next.js 服务是否已经启动。
- 如果没有启动，重新执行启动命令，并重启 Nginx。

### 3. 依赖版本冲突（`lucide-react`）

固定使用以下安装命令：

```bash
npm install --legacy-peer-deps
```

### 4. 服务器重启后网站打不开

原因通常是项目进程没有自动恢复。  
处理方式：重新执行一次后台启动命令即可。

---

## 六、后期预留拓展

- 域名绑定，修改 Nginx 的 `server_name`
- 配置 HTTPS 免费 SSL 证书
- Next.js API 对接 MySQL 8.0
- 增加文章后台管理与留言系统

---

## 七、备注

- 本项目基于 **Next.js 16 App Router**
- 当前以服务端渲染和静态生成为主
- 不使用 PM2，采用系统原生 `nohup` 常驻，流程简单直接
- 服务器配置为 2 核 4G，当前运行压力不大

> 注：这是一份偏自用的运维记录文档，后续会随着部署方式变化继续更新。
