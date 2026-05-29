---
title: Node.js、npm 与 yarn 入门说明
date: 2026/05/29
desc: 讲清楚 Node.js、npm、yarn 分别是什么、它们之间是什么关系，以及新手最常用的一些基础命令，适合刚开始搭建前端开发环境时阅读。
tags: ['#工程化', '#全部', '#Node.js', '#npm', '#yarn']
cover: https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>这篇文章主要解决一个常见问题：刚开始学前端时，经常会分不清 Node.js、npm、yarn 到底分别是做什么的。</small>

# 一、先把三个名字分清楚

很多人第一次接触前端工程化时，最容易混淆的就是这三个名字：

- `Node.js`
- `npm`
- `yarn`

它们确实经常一起出现，但角色并不一样。

可以先这样理解：

- `Node.js`：让 JavaScript 可以在浏览器之外运行
- `npm`：Node.js 自带的包管理工具
- `yarn`：也是包管理工具，可以理解成 `npm` 的另一种选择

所以它们不是同一种东西。

# 二、Node.js 是做什么的

`Node.js` 本质上是一个 **JavaScript 运行环境**。

以前很多人会觉得 JavaScript 只能在浏览器里运行，比如操作页面、处理点击事件、发请求等等。  
装上 `Node.js` 之后，JavaScript 还可以在你的电脑终端里运行。

这件事为什么重要？

因为现在大多数前端项目都依赖 Node 环境来完成这些事情：

- 安装项目依赖
- 启动本地开发服务器
- 打包项目
- 运行测试
- 执行脚本命令

比如你平时执行的：

```bash
yarn dev
npm run build
```

背后都离不开 `Node.js`。

# 三、npm 是什么

`npm` 的全称是 `Node Package Manager`。

它是 `Node.js` 自带的包管理工具。通常你装完 Node 之后，`npm` 也就一起有了。

它主要用来做两件事：

- 下载项目依赖
- 执行项目脚本

比如项目里需要 `react`、`next`、`typescript` 这些包，就可以用 `npm` 来安装。

常见命令例如：

```bash
npm install
npm run dev
```

简单理解：

- `npm install`：把项目依赖下载到本地
- `npm run dev`：执行 `package.json` 里定义的 `dev` 脚本

# 四、yarn 又是什么

`yarn` 也是一个包管理工具。

它和 `npm` 做的事情很像，也可以安装依赖、运行脚本、管理锁文件。

比如下面这些命令，你会发现和 `npm` 很像：

```bash
yarn
yarn dev
```

很多项目会固定使用 `yarn`，原因一般有这些：

- 团队已经统一使用 `yarn`
- 项目已经存在 `yarn.lock`
- 历史上对它的工作流更熟悉

你当前这个项目本身也是 `yarn` 工作流，所以平时命令应该优先用 `yarn`。

# 五、它们三者之间是什么关系

如果只用一句话来记：

`Node.js` 提供运行环境，`npm` 和 `yarn` 负责管理依赖。

更完整一点可以理解成：

1. 先用 `NVM` 安装一个合适版本的 `Node.js`
2. 装好 `Node.js` 之后，系统里通常就会有 `npm`
3. 如果项目要求使用 `yarn`，再安装或启用 `yarn`

所以真实使用流程往往是：

```bash
nvm install --lts
nvm use --lts
node -v
npm -v
```

确认环境没问题后，再进入项目目录安装依赖。

# 六、怎么检查自己有没有装好

你可以在终端里分别执行下面三条命令：

```bash
node -v
npm -v
yarn -v
```

如果输出了版本号，通常说明已经安装好了。

这里要注意：

- `node -v` 有结果，说明 Node.js 已安装
- `npm -v` 有结果，说明 npm 可用
- `yarn -v` 没结果，不一定有问题，可能只是还没安装 yarn

# 七、最常用的基础命令

下面这些命令，是平时最容易碰到的。

## 1. 查看 Node.js 版本

```bash
node -v
```

作用：

- 确认当前终端正在使用哪个 Node 版本

## 2. 查看 npm 版本

```bash
npm -v
```

作用：

- 确认 npm 是否已经正常可用

## 3. 查看 yarn 版本

```bash
yarn -v
```

作用：

- 确认当前电脑里有没有 yarn

## 4. 安装项目依赖

使用 `npm`：

```bash
npm install
```

使用 `yarn`：

```bash
yarn
```

作用：

- 读取项目里的依赖配置
- 下载所需包到本地

## 5. 启动开发环境

使用 `npm`：

```bash
npm run dev
```

使用 `yarn`：

```bash
yarn dev
```

作用：

- 启动本地开发服务器
- 让你可以在浏览器里预览项目

## 6. 打包项目

使用 `npm`：

```bash
npm run build
```

使用 `yarn`：

```bash
yarn build
```

作用：

- 生成生产环境构建结果

## 7. 安装某个依赖包

使用 `npm`：

```bash
npm install axios
```

使用 `yarn`：

```bash
yarn add axios
```

作用：

- 把指定依赖加入当前项目

# 八、什么时候用 npm，什么时候用 yarn

最简单的判断方式就是看项目本身。

一般来说：

- 有 `yarn.lock`：优先用 `yarn`
- 有 `package-lock.json`：优先用 `npm`

原因是同一个项目里最好统一工具，不要今天 `npm install`，明天 `yarn add`，这样容易让锁文件混乱。

你当前项目已经是 `yarn` 工作流，所以：

- 安装依赖用 `yarn`
- 启动项目用 `yarn dev`
- 构建项目用 `yarn build`

# 九、一个新手最常见的完整流程

如果你刚拿到一个前端项目，通常会这样做：

## 1. 先检查 Node 环境

```bash
node -v
```

如果项目对版本有要求，比如要求 Node `22`，就先用 `nvm` 切到对应版本。

## 2. 进入项目目录

```bash
cd 项目目录
```

## 3. 看项目用什么包管理器

如果目录里有：

- `yarn.lock`，就用 `yarn`
- `package-lock.json`，就用 `npm`

## 4. 安装依赖

```bash
yarn
```

或者：

```bash
npm install
```

## 5. 启动项目

```bash
yarn dev
```

或者：

```bash
npm run dev
```

做到这里，大多数项目都已经可以跑起来了。

# 十、常见问题

## 1. 为什么装了 Node 之后还要学 npm 或 yarn

因为只装 `Node.js` 还不够。

你需要 `npm` 或 `yarn` 来：

- 安装依赖
- 管理依赖版本
- 运行项目脚本

所以开发里这几个工具通常是配合使用的。

## 2. npm 和 yarn 必须同时用吗

不必须。

通常一个项目里选一个主工具就够了。  
如果项目规定用 `yarn`，那你就跟着项目走，不需要混着来。

## 3. yarn 没装怎么办

先确认项目是不是真的需要 `yarn`。

如果需要，再按项目要求安装。  
如果项目本来就用 `npm`，那其实不装 `yarn` 也没关系。

# 十一、一句话总结

如果你刚开始接触前端工程化，可以先这样记：

- `Node.js` 负责运行环境
- `npm` 和 `yarn` 负责依赖管理
- 项目用哪个包管理器，就跟着哪个项目规范走

把这个关系理顺之后，后面再看项目脚本、构建命令、依赖安装，就不会那么乱了。
