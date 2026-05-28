---
title: Git 常用操作笔记
date: 2026/05/19
desc: 按速查方式整理日常开发里最常用的 Git 操作，包括分支、stash、rebase、cherry-pick、回滚和冲突处理。
tags: ['#全部', '#Git', '#工程化']
cover: https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2069&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2069&auto=format&fit=crop" width=600 />

<small>Git 最适合做成命令速查表，这篇只保留以后最常会忘的命令。</small>

# 一、分支与提交

```bash
git switch -c feature/my-note
git add .
git commit -m "feat(notes): add git cheatsheet"
```

- 原理总结：新功能优先开新分支，提交按阶段拆开。
- 注意点：不要直接在 `main` 上写长期开发内容。

# 二、stash

```bash
git stash push -m "wip"
git stash list
git stash pop
```

- 原理总结：把当前未完成修改临时收起来，切任务时最方便。
- 注意点：`pop` 会尝试恢复并删除 stash，重要改动可先用 `apply`。

# 三、rebase 与冲突

```bash
git fetch origin
git rebase origin/main
git rebase --continue
git rebase --abort
```

- 原理总结：把当前分支提交重新接到最新主线后面。
- 注意点：公共分支慎用改历史操作。

# 四、cherry-pick 与回滚

```bash
git cherry-pick <commit-id>
git revert <commit-id>
```

- 原理总结：`cherry-pick` 是摘提交，`revert` 是反向生成新提交。
- 注意点：回滚已推送提交优先 `revert`，不要乱改公共历史。
