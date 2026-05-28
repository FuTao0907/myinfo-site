---
title: TypeScript 工具类型速查笔记
date: 2026/05/19
desc: 按速查方式整理最常用的 TypeScript 工具类型，包括 Partial、Required、Pick、Omit、Record、Exclude、Extract 和 ReturnType。
tags: ['#TypeScript模块', '#全部', '#TypeScript', '#工具类型']
cover: https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>工具类型最适合做成速查表，这篇重点就是“叫什么、干什么、怎么用”。</small>

# 一、基础模型

```ts
type User = {
  id: number
  name: string
  email?: string
}
```

# 二、常用工具类型

```ts
type UserDraft = Partial<User>
type UserRequired = Required<User>
type UserBase = Pick<User, 'id' | 'name'>
type UserWithoutEmail = Omit<User, 'email'>
type UserMap = Record<string, User>
type NoString = Exclude<string | number, string>
type OnlyString = Extract<string | number, string>
type FnReturn = ReturnType<() => Promise<User>>
```

- 原理总结：官方工具类型本质上是在已有类型上做“选、删、改、映射”。
- 注意点：业务里优先用现成工具类型，别一上来自己重复造轮子。

# 三、自定义工具类型

```ts
/**
 * 把对象所有字段都变成可空。
 */
type Nullable<T> = {
  [K in keyof T]: T[K] | null
}
```

- 原理总结：映射类型会遍历对象所有键，再统一改造值类型。
- 注意点：自定义工具类型命名要直观，不然项目里很快就看不懂。
