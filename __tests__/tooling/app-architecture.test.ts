import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

const projectRoot = process.cwd()

/**
 * 读取指定 app 文件内容，检查是否已通过 domains/shared 适配层引用依赖。
 */
function readAppFile(relativePath: string) {
  return fs.readFileSync(path.join(projectRoot, relativePath), 'utf8')
}

describe('app architecture', () => {
  it('blog 路由通过 domains 层读取博客组件和数据', () => {
    const fileContent = readAppFile('src/app/blog/page.tsx')

    expect(fileContent.includes("from '~/domains/blog/") || fileContent.includes("from '~blog/")).toBe(true)
  })

  it('project 路由通过 domains 层读取项目组件和数据', () => {
    const fileContent = readAppFile('src/app/project/page.tsx')

    expect(
      fileContent.includes("from '~/domains/project/") || fileContent.includes("from '~project/")
    ).toBe(true)
  })

  it('根布局通过 shared 或 domains 层读取布局和站点数据', () => {
    const fileContent = readAppFile('src/app/layout.tsx')

    expect(fileContent.includes("from '~/shared/") || fileContent.includes("from '~shared/")).toBe(true)
    expect(fileContent.includes("from '~/domains/site/") || fileContent.includes("from '~site/")).toBe(true)
  })
})
