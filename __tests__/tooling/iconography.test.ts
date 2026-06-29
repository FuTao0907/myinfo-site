import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

const projectRoot = process.cwd()
const sourceRoot = path.join(projectRoot, 'src')
const allowedLucideImportFile = 'src/shared/components/ui/icons.ts'

/**
 * 递归收集源码目录中的 TypeScript 文件，用于检查图标导入约定。
 */
function collectTypeScriptFiles(directoryPath: string): string[] {
  return fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directoryPath, entry.name)

    if (entry.isDirectory()) {
      return collectTypeScriptFiles(entryPath)
    }

    if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      return [entryPath]
    }

    return []
  })
}

/**
 * 将绝对路径转换成基于仓库根目录的相对路径，方便断言输出。
 */
function toProjectRelativePath(filePath: string) {
  return path.relative(projectRoot, filePath).replace(/\\/g, '/')
}

describe('iconography conventions', () => {
  it('只允许共享图标入口直接依赖 lucide-react', () => {
    const sourceFiles = collectTypeScriptFiles(sourceRoot)

    const filesUsingLucide = sourceFiles
      .map((filePath) => ({
        filePath,
        relativePath: toProjectRelativePath(filePath),
        content: fs.readFileSync(filePath, 'utf8'),
      }))
      .filter((file) => file.content.includes("from 'lucide-react'"))
      .map((file) => file.relativePath)

    expect(filesUsingLucide).toEqual([allowedLucideImportFile])
  })
})

