import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

const projectRoot = process.cwd()

/**
 * 读取仓库根目录下的 JSON 文件并返回解析结果。
 */
function readJsonFile<T>(relativePath: string): T {
  const absolutePath = path.join(projectRoot, relativePath)
  const fileContent = fs.readFileSync(absolutePath, 'utf8')

  return JSON.parse(fileContent) as T
}

/**
 * 读取仓库根目录下的文本文件内容。
 */
function readTextFile(relativePath: string) {
  return fs.readFileSync(path.join(projectRoot, relativePath), 'utf8')
}

describe('tooling automation', () => {
  it('package.json 配置了 husky prepare 脚本', () => {
    const packageJson = readJsonFile<{ scripts?: Record<string, string> }>('package.json')

    expect(packageJson.scripts?.prepare).toBe('husky')
  })

  it('仓库存在 pre-push 钩子并执行 yarn verify', () => {
    const hookPath = path.join(projectRoot, '.husky', 'pre-push')

    expect(fs.existsSync(hookPath)).toBe(true)
    expect(readTextFile('.husky/pre-push')).toContain('yarn verify')
  })

  it('仓库存在 verify 工作流并在 CI 中执行 yarn verify', () => {
    const workflowPath = path.join(projectRoot, '.github', 'workflows', 'verify.yml')

    expect(fs.existsSync(workflowPath)).toBe(true)
    expect(readTextFile('.github/workflows/verify.yml')).toContain('yarn verify')
  })
})
