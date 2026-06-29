---
title: NVM 安装与常用命令教程
date: 2026/05/29
desc: 一篇讲清楚 Windows 和 macOS 上如何安装 NVM、安装 Node.js，以及最常用 NVM 命令的入门教程，适合后续快速照着操作。
tags: ['#工程化', '#全部', '#NVM', '#Node.js']
cover: https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>这篇文章主要解决两个问题：电脑怎么装 NVM，以及装好之后最常用的命令是什么。</small>

# 一、先理解 NVM 是做什么的

NVM 的全称是 `Node Version Manager`，也就是 **Node.js 版本管理工具**。

它的作用很直接：

- 你可以在一台电脑上安装多个 Node.js 版本
- 不同项目需要不同 Node 版本时，可以快速切换
- 不需要手动卸载再重装 Node.js

最常见的使用场景：

- 老项目要用 Node `18`
- 新项目要用 Node `22`
- 你想同时保留多个版本，随时切换

所以，**先装 NVM，再用 NVM 安装 Node.js**，通常比直接去官网反复安装 Node 更省事。

# 二、Windows 和 macOS 的区别

这一点一定要先分清：

- `Windows` 常用的是 `nvm-windows`
- `macOS` 常用的是官方社区版 `nvm`

它们名字都叫 NVM，但**安装方式不一样**，命令大部分相似，不过底层实现不是同一个项目。

所以你不能把 mac 的安装命令直接复制到 Windows 里跑。

# 三、Windows 安装 NVM

## 1. 先卸载已安装的 Node.js

如果你的电脑以前已经直接装过 Node.js，建议先卸载。

原因很简单：

- 避免旧的 Node 路径和 NVM 冲突
- 避免后面 `node -v` 显示的不是 NVM 管理的版本

可以在：

- `设置 -> 应用 -> 已安装的应用`
- 找到 `Node.js`
- 直接卸载

如果你之前没装过，可以跳过这一步。

## 2. 下载 `nvm-windows`

打开它的发布页下载最新安装包：

[nvm-windows Releases](https://github.com/coreybutler/nvm-windows/releases)

通常下载：

- `nvm-setup.exe`

## 3. 安装时注意什么

安装过程基本一路下一步就行，但要注意两件事：

- 安装路径尽量保持默认，少折腾
- 如果你之前装过 Node，确认旧目录不要再残留到系统环境变量里

安装时你可能会看到两个路径配置，初学者这里最容易懵：

- `NVM for Windows` 的安装目录：这是 `nvm` 工具本身放的位置
- `Node.js symlink` 的目录：这是当前正在使用的 Node 版本对应的快捷映射位置

如果你只是正常开发，**保持默认路径通常最稳**，不要一开始就改到很深或很特殊的目录里。

安装完成后，重新打开终端，执行：

```powershell
nvm version
```

如果能看到版本号，说明安装成功。

## 4. 用 NVM 安装 Node.js

比如安装 Node `22`：

```powershell
nvm install 22
```

安装完成后切换到这个版本：

```powershell
nvm use 22
```

然后检查：

```powershell
node -v
npm -v
```

如果正常输出版本号，就表示这套已经能用了。

# 四、macOS 安装 NVM

## 1. 先确认有没有 Homebrew

虽然 `nvm` 不一定必须通过 Homebrew 安装，但大多数 mac 开发环境都会先装 Homebrew。

先执行：

```bash
brew -v
```

如果有版本号，说明已经装了。

如果没有，也没关系，下面直接用官方安装脚本也可以。

## 2. 使用官方脚本安装

执行下面命令：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

这条命令做的事情可以简单理解成两步：

- 把 `nvm` 下载到你当前用户目录下
- 自动把 `nvm` 的加载配置写到 shell 配置文件里

安装完成后，终端里一般要重新加载配置。

如果你使用的是 `zsh`，可以执行：

```bash
source ~/.zshrc
```

如果你使用的是 `bash`，可以执行：

```bash
source ~/.bashrc
```

然后检查：

```bash
nvm --version
```

能输出版本号就说明安装成功。

## 3. 用 NVM 安装 Node.js

安装最新版长期支持版：

```bash
nvm install --lts
```

或者安装指定版本：

```bash
nvm install 22
```

切换版本：

```bash
nvm use 22
```

如果你是第一次在这台 Mac 上装 Node，也可以直接这样一步到位：

```bash
nvm install --lts
nvm use --lts
```

检查是否生效：

```bash
node -v
npm -v
```

# 五、最常用的 NVM 命令

下面这些命令，基本就是以后最常用的一组。

## 1. 查看可安装版本

```bash
nvm list available
```

说明：

- `Windows` 下常用这条看可安装版本
- `macOS` 下也可以查版本，但常见用法更多是直接装指定版本或 `--lts`

## 2. 安装指定 Node 版本

```bash
nvm install 22
```

说明：

- 会安装 Node `22`
- 不同大版本适合不同项目

## 3. 安装最新长期支持版

```bash
nvm install --lts
```

说明：

- 如果你不确定该装哪个版本，优先用这个
- `LTS` 一般更稳定，更适合日常开发

## 4. 查看本机已安装版本

```bash
nvm list
```

说明：

- 可以看你本机已经装了哪些 Node 版本
- 当前正在使用的版本通常会有标记

## 5. 切换 Node 版本

```bash
nvm use 22
```

说明：

- 当前终端会切到 Node `22`
- 切换后再执行 `node -v` 检查一下最稳

## 6. 设置默认版本

`macOS` 常见做法：

```bash
nvm alias default 22
```

说明：

- 以后新开终端时，默认就用 Node `22`

`Windows` 的 `nvm-windows` 没有完全相同的 `alias default` 习惯用法，通常就是：

- 安装好后手动 `nvm use 22`
- 或固定在你常用的版本上

## 7. 卸载某个版本

```bash
nvm uninstall 20
```

说明：

- 当某个版本不用了，可以直接删掉
- 不会影响其他版本

# 六、一个最常见的使用流程

假设你新电脑刚装好 NVM，最常见流程其实就这几步：

```bash
nvm install --lts
nvm use --lts
node -v
npm -v
```

如果项目要求固定版本，比如要求 Node `18`：

```bash
nvm install 18
nvm use 18
node -v
```

这个流程已经够应付绝大多数项目初始化了。

# 七、NVM、Node.js、npm 之间是什么关系

很多新手刚开始会把这三个东西混在一起，这里顺手理一下：

- `NVM`：版本管理工具，用来安装和切换不同版本的 Node.js
- `Node.js`：JavaScript 运行环境，很多前端项目都依赖它
- `npm`：Node.js 自带的包管理工具，装完 Node 后一般就会一起有

也就是说，常见关系通常是：

1. 先装 `NVM`
2. 再用 `NVM` 安装 `Node.js`
3. 然后你就可以使用 `npm`

如果项目里还用到了 `yarn`，也通常是在装好 Node 之后再安装。

# 八、常见问题

## 1. 装完 NVM 后，终端提示找不到 `nvm`

常见原因：

- 终端没有重开
- shell 配置没有重新加载
- 安装时环境变量没生效

处理方式：

- 先关闭终端再重新打开
- `macOS` 执行一次 `source ~/.zshrc` 或 `source ~/.bashrc`
- `Windows` 重开 PowerShell 或系统终端

## 2. `node -v` 显示的不是你刚切换的版本

常见原因：

- 电脑里还残留旧版 Node.js
- 环境变量优先级冲突

处理方式：

- 确认旧版 Node 是否已经卸载
- 重新开终端后再执行 `nvm use 版本号`

## 3. 到底该装哪个 Node 版本

简单记法：

- 没有项目要求：优先 `LTS`
- 有项目要求：按项目文档来
- 多项目并存：都装上，用 `nvm use` 切换

# 九、最后怎么记最省事

如果你只想记最核心的几条，记住下面这些就够了：

```bash
nvm install --lts
nvm install 22
nvm list
nvm use 22
nvm uninstall 20
```

这几条已经覆盖：

- 安装
- 查看
- 切换
- 卸载

对大多数开发场景来说，已经足够。

# 十、一句话总结

如果你以后经常需要切换不同的 Node.js 版本，那么：

- `Windows` 装 `nvm-windows`
- `macOS` 装社区版 `nvm`
- 然后用 `nvm install` 和 `nvm use` 管理 Node 版本

这样后面不管新项目、老项目，还是不同 Node 版本切换，都会轻松很多。
