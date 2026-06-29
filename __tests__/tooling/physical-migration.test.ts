import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

const projectRoot = process.cwd()

/**
 * 读取领域或共享入口文件内容，确保它已经成为真实实现而不是代理导出。
 */
function readEntryFile(relativePath: string) {
  return fs.readFileSync(path.join(projectRoot, relativePath), 'utf8').trim()
}

describe('physical migration', () => {
  it('domains 与 shared 入口文件不再只是单行 re-export', () => {
    const entryFiles = [
      'src/domains/home/components/HomeShowcase.tsx',
      'src/domains/blog/components/PostClient.tsx',
      'src/domains/blog/components/PostsClient.tsx',
      'src/domains/project/components/ProjectsClient.tsx',
      'src/domains/resume/components/ResumePageClient.tsx',
      'src/shared/components/layouts/AppShell.tsx',
      'src/shared/components/layouts/SiteHeader.tsx',
      'src/shared/components/layouts/SiteNavigation.tsx',
      'src/shared/components/ui/ThemeToggle.tsx',
      'src/shared/components/search/SearchDialog.tsx',
      'src/shared/components/providers/SiteConfigProvider.tsx',
      'src/shared/components/providers/ToastProvider.tsx',
    ]

    entryFiles.forEach((filePath) => {
      const fileContent = readEntryFile(filePath)

      expect(fileContent.startsWith('export { default }')).toBe(false)
    })
  })
})
