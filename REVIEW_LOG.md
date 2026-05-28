# 审查日志

## 2026-05-15

### 审查范围

- 项目路径：`e:\study\Myinfo\myinfo-site`
- 审查方式：`next build`、`eslint`、关键模块人工审查
- 排除项：评论系统（按要求不纳入本次审查范围）

### 审查结果

- 结论：**未通过**
- 最终评分：**72 / 100**
- 结果说明：代码规范状态较好，`eslint` 已通过；但首页仍存在阻塞生产构建的问题，当前版本不适合直接发布。

### 问题清单

#### P0

1. **首页生产构建失败，阻塞发布**
   - 等级：P0 / 阻塞
   - 位置：`src/components/bento/common/AMapView.tsx`
   - 现象：执行 `next build` 时，首页 `/` 在预渲染阶段报错 `ReferenceError: window is not defined`。
   - 原因：文件顶层直接导入了 `@amap/amap-jsapi-loader`。该 SDK 在服务端预渲染链路中被求值时访问了浏览器环境，导致 SSR 失败。
   - 影响：项目虽然本地开发可运行，但生产构建失败，无法稳定部署。
   - 建议：将高德 SDK 改为仅在客户端动态加载，例如在 `useEffect` 中执行 `const { default: AMapLoader } = await import("@amap/amap-jsapi-loader")`，或使用 `next/dynamic` 对地图卡片做纯客户端隔离。

#### P1

1. **高德地图凭据直接写死在仓库配置中**
   - 等级：P1 / 高
   - 位置：`src/config/param.ts`
   - 现象：`key` 与 `securityJsCode` 当前以明文形式保存在代码仓库中。
   - 原因：地图配置直接放在前端源码常量里，缺少环境变量和环境区分。
   - 影响：增加密钥滥用、环境切换困难、域名白名单误配置后的排查成本；后续接入预发/生产环境时也不利于管理。
   - 建议：改为读取环境变量，并区分本地开发、测试、生产环境配置；同时确认高德控制台的域名白名单策略与本地 `localhost` 一致。

#### P2

1. **地图主题不会随着深浅色切换同步更新**
   - 等级：P2 / 中
   - 位置：`src/components/bento/common/AMapView.tsx`
   - 现象：地图初始化时只读取一次 `document.documentElement.classList.contains("dark")`，后续切换主题时地图样式不会同步变更。
   - 原因：地图样式在初始化后没有监听全局主题变化，也没有调用地图实例更新样式。
   - 影响：整体 UI 已切换到夜间/日间模式时，地图卡片仍可能停留在旧主题，造成视觉不一致。
   - 建议：监听 `html` 的 `class` 变化，或将主题状态作为 props 传入，并在变化时调用地图实例更新 `mapStyle`。

### 复核记录

- `npx eslint .`：通过
- `npm run build`：失败

### 后续处理建议

1. 先修复 `AMapView` 的 SSR 导入问题，恢复首页生产构建。
2. 再整理地图配置读取方式，移除仓库内硬编码凭据。
3. 最后补齐地图主题同步逻辑，提升 UI 一致性。

---

## 2026-05-15（复审）

### 审查范围

- 项目路径：`e:\study\Myinfo\myinfo-site`
- 审查方式：修复后再次执行 `next build`、`eslint`，并复核地图卡片关键逻辑
- 排除项：评论系统（按要求不纳入本次审查范围）

### 审查结果

- 结论：**通过**
- 最终评分：**93 / 100**
- 结果说明：阻塞构建的问题已修复，地图配置已从源码硬编码迁移到本地环境变量，主题切换也能同步驱动地图样式更新；当前版本已经具备稳定构建与发布条件。

### 本轮修复项

1. **首页构建阻塞已修复**
   - 位置：`src/components/bento/common/AMapView.tsx`
   - 处理：将高德 SDK 改为 `useEffect` 内动态导入，避免预渲染阶段触发 `window is not defined`。

2. **高德配置已移出源码常量**
   - 位置：`src/config/param.ts`、`.env.local`
   - 处理：`AMapSetting` 改为从 `NEXT_PUBLIC_AMAP_KEY` 与 `NEXT_PUBLIC_AMAP_SECURITY_JS_CODE` 读取，本地开发配置放入 `.env.local`。

3. **地图主题同步已补齐**
   - 位置：`src/components/bento/common/AMapView.tsx`
   - 处理：监听 `html` 上的 `class` 变化，在深浅色切换时同步更新地图 `mapStyle`。

### 当前遗留问题

- 本轮复审未发现新的阻塞问题。
- 低风险提示：后续部署到线上时，需要在对应环境补齐地图环境变量，并确认高德控制台域名白名单与线上域名一致。

### 复核记录

- `npx eslint .`：通过
- `npm run build`：通过

---

## 2026-05-15（夜间收尾复审）

### 审查范围

- 项目路径：`e:\study\Myinfo\myinfo-site`
- 审查方式：人工复核首页地图卡片、地图预览弹层、路由过渡承载层，并执行 `yarn type-check`、`yarn lint`
- 本轮关注点：
  - 首页地图卡片箭头交互是否补齐
  - 地图预览层拖拽是否仍会联动 Bento 卡片
  - 页面切换动画是否只在路由变化时触发

### 审查结果

- 结论：**通过**
- 最终评分：**95 / 100**
- 结果说明：本轮未发现新的阻塞问题。首页地图预览交互已补齐，拖拽冲突已解决；路由过渡已回归 `arvin` 源项目原始数值，并且收敛为“仅在路由切换时触发”的实现。当前版本适合作为今天的收尾版本保留。

### 问题清单

#### 无新增 P0 / P1 / P2

- 本轮未发现阻塞构建、运行时报错、明显交互失效等高优先级问题。

#### 无新增 P3

- 本轮未发现需要记录的低优先级问题。

### 本轮确认项

1. **地图预览交互已补齐**
   - 位置：`src/components/bento/common/AMapView.tsx`
   - 处理：地图卡片右下角箭头现可打开大图预览层，支持遮罩关闭、按钮关闭、`Esc` 关闭。

2. **地图预览拖拽冲突已解决**
   - 位置：`src/components/bento/common/AMapView.tsx`
   - 处理：预览层中的地图拖动不再联动首页 Bento 卡片。

3. **动画模式切换不再触发当前页重播**
   - 位置：`src/components/layouts/AppShell.tsx`
   - 处理：路由过渡改为仅在 `pathname` 变化时执行，切换 `page / fade / translateY` 只影响下一次跳转。

4. **路由过渡数值已对齐源项目**
   - 位置：`src/components/layouts/AppShell.tsx`
   - 处理：`translateY / fade / page` 已恢复为 `arvin` 源项目的原始时长与强度，仅保留“只在真实路由变化时触发”的额外修正。

### 复核记录

- `yarn type-check`：通过
- `yarn lint`：通过

---

## 2026-05-19（全项目复审）

### 审查范围

- 项目路径：`e:\study\Myinfo\myinfo-site`
- 审查方式：执行 `yarn lint`、`yarn type-check`、`yarn build`、`yarn test`，并人工复核全局搜索、文章详情页、文章读取与本地回退、地图预览弹层、全局布局承载层
- 本轮关注点：
  - 本轮新增的搜索弹层、滚动锁和文章页目录/返回顶部逻辑是否影响整站稳定性
  - 生产构建、类型检查和代码规范是否仍保持通过
  - 质量门禁脚本是否可以完整执行

### 审查结果

- 结论：**未通过**
- 最终评分：**89 / 100**
- 结果说明：`yarn lint`、`yarn type-check`、`yarn build` 均已通过，未发现新的阻塞构建或明显运行时问题；但 `yarn test` 当前会因项目内缺少测试文件而直接退出失败，按现有脚本约定仍不满足完整质量门禁。

### 问题清单

#### P2

1. **测试脚本当前无法通过，接入 CI 时会阻塞**
   - 等级：P2 / 中
   - 位置：`package.json`、`src/lib/helpers/body-scroll-lock.ts`、`src/lib/helpers/posts.ts`
   - 现象：执行 `yarn test` 时，Vitest 返回 `No test files found, exiting with code 1`。
   - 原因：项目已声明 `test` 脚本，但当前仓库中没有任何符合 Vitest 默认匹配规则的测试文件。
   - 影响：本地手动开发不受影响，但如果 CI 按 `test` 步骤执行，当前版本会在测试阶段直接失败。
   - 建议：优先为 `body-scroll-lock`、`posts` 这类纯函数与核心读取逻辑补充最小有效测试；如果短期内不准备维护测试，则需要明确调整测试脚本或 Vitest 配置策略，避免质量门禁与仓库现状不一致。

#### 无新增 P0 / P1

- 本轮未发现新的阻塞构建、SSR 崩溃、路由失效或明显交互失效问题。

### 本轮确认项

1. **搜索弹层与项目/地图弹层的滚动锁已收敛**
   - 位置：`src/lib/helpers/body-scroll-lock.ts`、`src/components/features/search/SearchDialog.tsx`
   - 处理：改为计数式 body 滚动锁，避免多个弹层打开/关闭时互相覆盖滚动状态。

2. **文章页目录与返回顶部交互已恢复到目标结构**
   - 位置：`src/components/features/blog/PostClient.tsx`
   - 处理：目录固定在右侧，返回顶部按钮通过 `portal` 固定到视口右下角，避免被正文树的定位上下文影响。

3. **全局布局、类型检查与生产构建保持稳定**
   - 位置：`src/components/layouts/AppShell.tsx`
   - 处理：复核后确认 `yarn lint`、`yarn type-check`、`yarn build` 均通过，首页、文章、日常、项目页面可正常参与静态生成。

### 复核记录

- `yarn lint`：通过
- `yarn type-check`：通过
- `yarn build`：通过
- `yarn test`：失败（无测试文件，Vitest 退出码 1）

---

## 2026-05-20（测试问题修复复审）

### 审查范围

- 项目路径：`e:\study\Myinfo\myinfo-site`
- 审查方式：补充测试后执行 `yarn test`、`yarn lint`、`yarn type-check`、`yarn build`
- 本轮关注点：
  - 昨天复审中提到的 Vitest 空测试集问题是否已解决
  - 新增测试是否覆盖到最核心的纯函数逻辑
  - 补测后是否引入新的类型、构建或 lint 问题

### 审查结果

- 结论：**通过**
- 最终评分：**96 / 100**
- 结果说明：昨天复审中唯一未关闭的问题已修复。项目现已补充最小有效测试，`yarn test`、`yarn lint`、`yarn type-check`、`yarn build` 全部通过，当前版本满足完整质量门禁。

### 本轮修复项

1. **补齐 body 滚动锁的最小有效测试**
   - 位置：`src/lib/helpers/body-scroll-lock.test.ts`
   - 处理：覆盖首次加锁、多次加锁和最终解锁恢复滚动的关键路径，验证多个弹层共享滚动锁时的计数行为。

2. **补齐文章读取 helper 的最小有效测试**
   - 位置：`src/lib/helpers/posts.test.ts`
   - 处理：覆盖本地 Markdown 读取、技术文章与日常文章区分、按原始/编码 id 查询详情、标签去重与默认“全部”标签生成。

### 当前遗留问题

- 本轮未发现新的阻塞问题。
- 低风险提示：测试目前属于“最小有效覆盖”，后续如果继续增加搜索、内容读取或布局层逻辑，建议按模块继续补充对应测试。

### 复核记录

- `yarn test`：通过
- `yarn lint`：通过
- `yarn type-check`：通过
- `yarn build`：通过
