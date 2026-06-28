import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vitest/config'
import { getVitestAliasEntries } from './config/tooling/paths.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 返回 Vitest 配置，并复用项目共享路径定义来收口别名维护点。
 */
function getVitestConfig() {
  return defineConfig({
    resolve: {
      alias: getVitestAliasEntries(__dirname),
    },
    test: {
      environment: 'node',
      include: ['__tests__/**/*.test.ts'],
    },
  })
}

export default getVitestConfig()
