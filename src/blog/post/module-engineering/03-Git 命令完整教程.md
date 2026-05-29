---
title: Git 命令完整教程
date: 2026/05/29
desc: 从 Git 是什么开始，系统讲清楚初始化仓库、提交代码、分支协作、合并、回退、远程仓库和常见排错命令，适合日常开发直接照着使用。
tags: ['#工程化', '#全部', '#Git', '#版本控制']
cover: https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>这篇文章不是只列命令，而是把 Git 开发里最常见的一整套操作都串起来，方便你真正理解每条命令是干什么的。</small>

# 一、先理解 Git 是做什么的

`Git` 是一个 **版本控制工具**。

它主要解决这些问题：

- 记录每次代码修改
- 随时查看是谁改了什么
- 出问题时回到之前的版本
- 多人协作时避免文件互相覆盖
- 把本地代码同步到远程仓库，比如 GitHub、Gitee

简单来说，Git 就像代码的“时间机器”和“协作记录本”。

# 二、先理解几个核心概念

很多人学 Git 一上来就背命令，结果后面很容易乱。  
先把几个最核心的词理解掉，后面命令就顺了。

## 1. 工作区

你正在电脑里编辑的文件，就是工作区。

比如你刚改了一个 `tsx` 文件，但还没有执行任何 Git 命令，这时修改还只是工作区变化。

## 2. 暂存区

暂存区可以理解成“这次准备提交的内容清单”。

你执行 `git add` 之后，文件会先进暂存区。

## 3. 本地仓库

本地仓库里保存的是已经提交过的历史版本。

你执行 `git commit` 之后，改动才真正进入历史记录。

## 4. 远程仓库

远程仓库就是放在代码平台上的仓库，比如：

- GitHub
- Gitee
- GitLab

你执行 `git push` 时，本地提交会被上传到远程仓库。

# 三、Git 最常见的完整流程

如果只看日常开发，一个最常见流程其实就是：

```bash
git status
git add .
git commit -m "feat: 新增某个功能"
git push
```

这四步的意思分别是：

- `git status`：看当前改了什么
- `git add .`：把改动加入暂存区
- `git commit -m "..."`：生成一次提交记录
- `git push`：把提交推到远程仓库

后面所有 Git 命令，基本都是围绕这个主线展开的。

# 四、初始化仓库相关命令

## 1. 新建 Git 仓库

```bash
git init
```

作用：

- 把当前文件夹初始化成一个 Git 仓库

什么时候用：

- 你新建了一个本地项目，还没有版本管理时

## 2. 查看当前仓库状态

```bash
git status
```

作用：

- 查看哪些文件被修改了
- 哪些文件已经暂存
- 当前所在分支是什么

这条命令非常重要，几乎是 Git 里最常用的一条。

## 3. 查看仓库配置

```bash
git config --list
```

作用：

- 查看当前 Git 配置，比如用户名、邮箱、编辑器等

## 4. 设置用户名和邮箱

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

作用：

- 配置提交记录里显示的作者信息

一般一台电脑只需要设置一次。

# 五、文件加入暂存区相关命令

## 1. 暂存单个文件

```bash
git add 文件名
```

比如：

```bash
git add src/app/page.tsx
```

作用：

- 只把一个指定文件加入暂存区

## 2. 暂存当前所有改动

```bash
git add .
```

作用：

- 把当前目录下所有已修改和新文件加入暂存区

这是日常开发里最常见的写法之一。

## 3. 交互式暂存

```bash
git add -p
```

作用：

- 按代码块选择哪些改动要进入暂存区

适合什么场景：

- 一个文件里改了很多内容，但你只想先提交其中一部分

# 六、提交记录相关命令

## 1. 提交暂存区内容

```bash
git commit -m "feat: 新增登录页"
```

作用：

- 把暂存区里的内容生成一条提交记录

你当前项目已经使用规范化提交，提交信息建议继续按这种格式：

- `feat`：新增功能
- `fix`：修复问题
- `docs`：文档修改
- `refactor`：重构
- `test`：测试相关
- `chore`：杂项维护

## 2. 修改上一次提交信息

```bash
git commit --amend -m "fix: 修正提交信息"
```

作用：

- 修改最近一次提交的说明文字

注意：

- 如果这次提交已经推送到远程，使用前要谨慎

## 3. 不改提交说明，继续补进上一次提交

```bash
git add .
git commit --amend --no-edit
```

作用：

- 把刚补的改动直接并入最近一次提交

这个命令常用于：

- 刚提交完才发现漏了一个文件

# 七、查看历史记录相关命令

## 1. 查看提交历史

```bash
git log
```

作用：

- 查看完整提交历史

## 2. 简洁模式查看历史

```bash
git log --oneline
```

作用：

- 用一行显示一条提交记录

日常使用中，这个比完整 `git log` 更常见。

## 3. 图形化查看分支历史

```bash
git log --oneline --graph --decorate --all
```

作用：

- 更直观地看分支、合并和提交关系

## 4. 查看某次提交的具体改动

```bash
git show 提交哈希
```

比如：

```bash
git show a1b2c3d
```

作用：

- 查看某次提交改了哪些内容

# 八、比较差异相关命令

## 1. 看工作区和暂存区的差异

```bash
git diff
```

作用：

- 查看你改了什么，但还没执行 `git add`

## 2. 看暂存区和上一次提交的差异

```bash
git diff --cached
```

作用：

- 查看已经暂存、但还没提交的内容

## 3. 比较两个提交

```bash
git diff 提交1 提交2
```

作用：

- 对比两个历史版本之间的差异

# 九、分支相关命令

## 1. 查看分支

```bash
git branch
```

作用：

- 查看本地分支
- 当前所在分支前面通常会有 `*`

## 2. 新建分支

```bash
git branch 分支名
```

比如：

```bash
git branch feature/login-page
```

## 3. 切换分支

```bash
git checkout 分支名
```

或者使用较新的写法：

```bash
git switch 分支名
```

## 4. 新建并切换分支

旧写法：

```bash
git checkout -b 分支名
```

新写法：

```bash
git switch -c 分支名
```

这条命令在实际开发里非常高频。

## 5. 删除本地分支

```bash
git branch -d 分支名
```

强制删除：

```bash
git branch -D 分支名
```

区别：

- `-d`：已经安全合并后再删
- `-D`：强制删，不管是否合并

# 十、合并相关命令

## 1. 把某个分支合并到当前分支

```bash
git merge 分支名
```

比如你当前在 `main` 分支：

```bash
git merge feature/login-page
```

作用：

- 把 `feature/login-page` 的提交合并进当前分支

## 2. 发生冲突后查看状态

```bash
git status
```

作用：

- 看哪些文件发生了冲突

## 3. 冲突解决后继续提交

```bash
git add .
git commit -m "fix: 解决合并冲突"
```

如果是 rebase 过程里的冲突，则常见是：

```bash
git rebase --continue
```

# 十一、回退与恢复相关命令

这部分是 Git 最容易让人紧张的地方，所以先记一句：

**回退前先 `git status`，重要场景先备份。**

## 1. 取消工作区修改

```bash
git restore 文件名
```

作用：

- 丢弃某个文件在工作区里的未提交修改

比如：

```bash
git restore src/app/page.tsx
```

## 2. 取消暂存

```bash
git restore --staged 文件名
```

作用：

- 把文件从暂存区移出来
- 但不会删除你工作区里的修改

## 3. 回退到上一个提交

```bash
git reset --soft HEAD~1
```

作用：

- 回退最近一次提交
- 代码改动还会保留在暂存区

## 4. 回退提交并保留工作区修改

```bash
git reset --mixed HEAD~1
```

作用：

- 回退最近一次提交
- 改动保留在工作区，但不在暂存区

## 5. 强制回到某个提交

```bash
git reset --hard 提交哈希
```

作用：

- 彻底把本地代码和历史重置到某个提交

注意：

- 这是高风险命令
- 会直接丢掉未保存的本地改动
- 用之前一定确认自己真的不需要那些修改

## 6. 反向撤销某次提交

```bash
git revert 提交哈希
```

作用：

- 新建一条“反向提交”来撤销之前某次提交

适合什么场景：

- 某次提交已经推到远程了，不适合直接 `reset`

# 十二、临时保存改动相关命令

## 1. 临时保存当前改动

```bash
git stash
```

作用：

- 先把当前没处理完的修改收起来
- 方便你先去切分支或处理别的问题

## 2. 查看暂存栈

```bash
git stash list
```

## 3. 恢复最近一次临时保存

```bash
git stash pop
```

作用：

- 恢复最近一次 `stash`
- 恢复成功后会顺便从列表里移除

## 4. 只恢复，不移除记录

```bash
git stash apply
```

# 十三、远程仓库相关命令

## 1. 查看远程仓库地址

```bash
git remote -v
```

作用：

- 查看当前项目绑定了哪些远程仓库

## 2. 添加远程仓库

```bash
git remote add origin 仓库地址
```

比如：

```bash
git remote add origin https://github.com/your-name/your-repo.git
```

## 3. 修改远程仓库地址

```bash
git remote set-url origin 新地址
```

## 4. 首次推送本地分支

```bash
git push -u origin main
```

作用：

- 把本地 `main` 分支推到远程
- 并建立默认跟踪关系

设置过一次之后，后面通常直接：

```bash
git push
```

## 5. 拉取远程更新

```bash
git pull
```

作用：

- 从远程拉最新代码并自动合并到本地

## 6. 只获取远程更新，不自动合并

```bash
git fetch
```

作用：

- 先把远程最新信息拉到本地
- 但暂时不改你当前分支内容

如果你想更稳一点，很多时候可以先：

```bash
git fetch
git status
```

确认情况后再决定是否合并。

# 十四、标签相关命令

## 1. 查看标签

```bash
git tag
```

## 2. 新建标签

```bash
git tag v1.0.0
```

## 3. 新建带说明的标签

```bash
git tag -a v1.0.0 -m "release: v1.0.0"
```

## 4. 推送标签

```bash
git push origin v1.0.0
```

推送全部标签：

```bash
git push origin --tags
```

标签常用于：

- 发版
- 标记某个稳定版本

# 十五、协作里特别常用的几个命令组合

## 1. 开始开发一个新功能

```bash
git switch main
git pull
git switch -c feature/xxx
```

意思是：

- 先回主分支
- 拉最新代码
- 再从最新主分支切出功能分支

## 2. 提交当前开发成果

```bash
git status
git add .
git commit -m "feat: 新增 xxx 功能"
git push
```

## 3. 处理临时插入的紧急问题

```bash
git stash
git switch main
git pull
git switch -c fix/xxx
```

处理完后再回来：

```bash
git switch 原来的分支
git stash pop
```

# 十六、最容易混淆的几组命令

## 1. `git pull` 和 `git fetch`

区别：

- `git pull`：拉取并尝试合并
- `git fetch`：只下载远程更新，不自动改当前分支

如果你想稳一点，先 `fetch` 再自己判断，通常更清楚。

## 2. `git reset` 和 `git revert`

区别：

- `git reset`：回退历史，偏向改写本地历史
- `git revert`：追加一条反向提交，偏向安全撤销

如果提交已经推到远程并且可能被别人使用，通常优先考虑 `git revert`。

## 3. `git switch` 和 `git checkout`

区别：

- `git checkout`：老写法，功能多
- `git switch`：新写法，语义更清楚，专门切分支

如果只是切换分支，优先记 `git switch` 更好理解。

# 十七、常见问题

## 1. 为什么执行 `git add .` 之后文件还没有真正提交

因为 `git add` 只是把文件放进暂存区。  
真正写入历史记录，还需要执行：

```bash
git commit -m "你的提交说明"
```

## 2. 为什么 `git push` 失败

常见原因：

- 远程有新的提交，你本地没同步
- 当前分支没有和远程分支建立跟踪关系
- 没有推送权限

可以优先检查：

```bash
git status
git remote -v
git pull
```

## 3. 为什么切分支时报错，提示有未提交修改

因为 Git 担心你当前改动会覆盖目标分支内容。  
通常可以这样处理：

- 先提交
- 或者先 `git stash`
- 或者确认不需要后再丢弃修改

# 十八、最后怎么记最省事

如果你现在只想先把日常开发最常用的一组记住，优先记这些：

```bash
git status
git add .
git commit -m "feat: xxx"
git push
git pull
git switch -c feature/xxx
git branch
git log --oneline
git diff
git stash
```

这几条已经能覆盖你大多数开发场景。

# 十九、一句话总结

如果把 Git 命令压缩成一句话来理解，那就是：

- 用 `git status` 看状态
- 用 `git add` 把改动放进暂存区
- 用 `git commit` 形成历史记录
- 用 `git push` 和远程同步
- 用分支、合并、回退命令管理协作和风险

只要先把这条主线理解清楚，后面再看其他 Git 命令，就不会觉得它很乱。
