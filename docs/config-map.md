# Config Map

## Root Entry Files

- `next.config.mjs`: Next.js 官方入口，只负责导出 Next 配置和 MDX 包装
- `tailwind.config.js`: Tailwind 官方入口，只负责主题扩展、扫描范围和插件声明
- `postcss.config.js`: PostCSS 官方入口，只保留样式处理插件
- `eslint.config.js`: ESLint Flat Config 入口，复用统一忽略目录
- `vitest.config.ts`: Vitest 入口，复用统一路径别名
- `tsconfig.json`: TypeScript 编译入口
- `package.json`: 统一管理脚本、依赖和仓库元信息

## Shared Sources

- `config/tooling/paths.mjs`: 集中维护源码目录与别名相关路径
- `config/tooling/shared.mjs`: 集中维护扫描范围、忽略目录和页面扩展名
- `src/env.ts`: 集中维护公开环境变量读取与校验

## Test Layout

- 所有 Vitest 测试文件统一放在 `__tests__/`
- 目前通过 `vitest.config.ts` 的 `include` 约束为 `__tests__/**/*.test.ts`
- 如需新增测试，优先在 `__tests__/` 下按原模块路径建立对应目录

## Automation

- 本地通过 `.husky/pre-push` 在推送前自动执行 `yarn verify`
- 远端通过 `.github/workflows/verify.yml` 在 `pull_request` 与 `push main` 时执行 `yarn verify`
- 日常迭代建议先本地运行 `yarn verify`，再提交和推送

## Alias Notes

- `config/tooling/paths.mjs` 现在同时提供 TypeScript 风格与 Vitest 风格的别名映射函数
- `vitest.config.ts` 直接复用 `config/tooling/paths.mjs` 的输出，避免再次手写 `@ -> src`
- `tsconfig.json` 因为是 JSON 入口，不能直接导入 JavaScript 模块，所以当前仍需手动保持与 `config/tooling/paths.mjs` 一致
- 如果后续要继续收敛，可以再评估把 TypeScript 路径别名拆到单独的 `tsconfig` 扩展文件

## Change Guide

- 改 `@` 别名时，优先检查 `config/tooling/paths.mjs`，然后同步确认 `tsconfig.json`
- 改 Tailwind 扫描范围时，优先检查 `config/tooling/shared.mjs`
- 改 Next.js 页面扩展名时，优先检查 `config/tooling/shared.mjs`
- 改忽略目录时，优先检查 `config/tooling/shared.mjs`
- 改公开环境变量时，优先检查 `src/env.ts` 与 `.env.example`

## Validation

- 运行 `yarn lint` 检查静态规则
- 运行 `yarn type-check` 检查 TypeScript
- 运行 `yarn test` 检查单元测试
- 运行 `yarn build` 检查生产构建
- 运行 `yarn verify` 执行完整回归
