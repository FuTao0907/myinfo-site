import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

const projectRoot = process.cwd()
const sourceRoot = path.join(projectRoot, 'src')
const guardedRoots = ['domains', 'shared'].map((segment) => path.join(sourceRoot, segment))

/**
 * 递归收集目录中的 TypeScript 文件，便于做导入约束检查。
 */
function collectTypeScriptFiles(directoryPath: string): string[] {
  if (!fs.existsSync(directoryPath)) {
    return []
  }

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
 * 将绝对路径转换为相对路径，便于断言输出更可读。
 */
function toProjectRelativePath(filePath: string) {
  return path.relative(projectRoot, filePath).replace(/\\/g, '/')
}

describe('architecture guard', () => {
  it('domains/shared 不应依赖 legacy components 路径', () => {
    const sourceFiles = guardedRoots.flatMap((root) => collectTypeScriptFiles(root))

    const offenders = sourceFiles
      .map((filePath) => ({
        filePath,
        relativePath: toProjectRelativePath(filePath),
        content: fs.readFileSync(filePath, 'utf8'),
      }))
      .filter((file) => file.content.includes("from '@/components/"))
      .map((file) => file.relativePath)

    expect(offenders).toEqual([])
  })
})
