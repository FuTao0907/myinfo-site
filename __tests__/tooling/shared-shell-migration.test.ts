import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

const projectRoot = process.cwd()

/**
 * 读取共享壳层文件，校验共享能力是否已经迁入 shared 目录。
 */
function readSharedFile(relativePath: string) {
  return fs.readFileSync(path.join(projectRoot, relativePath), 'utf8')
}

describe('shared shell migration', () => {
  it('AppShell 通过 shared 目录读取头部、搜索和 provider', () => {
    const fileContent = readSharedFile('src/shared/components/layouts/AppShell.tsx')

    expect(fileContent).toContain("from '~/shared/components/layouts/SiteHeader'")
    expect(fileContent).toContain("from '~/shared/components/search/SearchDialog'")
    expect(fileContent).toContain("from '~/shared/components/providers/SiteConfigProvider'")
    expect(fileContent).toContain("from '~/shared/components/providers/ToastProvider'")
  })
})
