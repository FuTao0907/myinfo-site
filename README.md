# Myinfo Site

基于 Next.js 16、React 19 和 TypeScript 的个人站点项目。

## 技术栈

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- React Markdown

## 本地开发

1. 安装依赖

```bash
yarn install
```

2. 启动开发环境

```bash
yarn dev
```

3. 打开浏览器访问 `http://localhost:3000`

## 常用命令

```bash
yarn dev
yarn lint
yarn type-check
yarn build
```

## 环境变量

复制 `.env.example` 并在本地创建 `.env.local`：

```env
NEXT_PUBLIC_AMAP_KEY=
NEXT_PUBLIC_AMAP_SECURITY_JS_CODE=
```

## 内容结构

- `src/app`：App Router 页面
- `src/components`：组件目录
- `src/lib`：常量和内容处理逻辑
- `src/styles`：全局样式
- `src/blog`：Markdown 内容
