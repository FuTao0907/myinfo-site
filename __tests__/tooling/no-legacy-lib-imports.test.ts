import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

const projectRoot = process.cwd()
const sourceRoot = path.join(projectRoot, 'src')
const guardedRoots = ['domains', 'shared'].map((segment) => path.join(sourceRoot, segment))

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

function toProjectRelativePath(filePath: string) {
  return path.relative(projectRoot, filePath).replace(/\\/g, '/')
}

describe('architecture guard', () => {
  it('domains/shared 不应依赖 legacy src/lib 的 public-content 与 search 实现', () => {
    const sourceFiles = guardedRoots.flatMap((root) => collectTypeScriptFiles(root))

    const offenders = sourceFiles
      .map((filePath) => ({
        relativePath: toProjectRelativePath(filePath),
        content: fs.readFileSync(filePath, 'utf8'),
      }))
      .filter(
        (file) =>
          file.content.includes("from '@/lib/public-content'") ||
          file.content.includes('from "@/lib/public-content"') ||
          file.content.includes("from '@/lib/search'") ||
          file.content.includes('from "@/lib/search"')
      )
      .map((file) => file.relativePath)

    expect(offenders).toEqual([])
  })
})

