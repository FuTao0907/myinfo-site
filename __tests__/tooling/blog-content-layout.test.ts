import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { getAllPosts, getRegularPosts, getWeeklyPosts } from '~/shared/lib/utils/posts'

const projectRoot = process.cwd()

/**
 * 返回项目中博客内容目录的绝对路径。
 */
function getBlogContentRoot() {
  return path.join(projectRoot, 'src', 'domains', 'blog', 'content')
}

describe('blog content layout', () => {
  it('文章内容应迁移到 domains/blog/content，且 src/blog 不再存在', () => {
    const blogContentRoot = getBlogContentRoot()
    const legacyRoot = path.join(projectRoot, 'src', 'blog')

    expect(fs.existsSync(blogContentRoot)).toBe(true)
    expect(fs.existsSync(path.join(blogContentRoot, 'post'))).toBe(true)
    expect(fs.existsSync(path.join(blogContentRoot, 'weekly'))).toBe(true)
    expect(fs.existsSync(path.join(blogContentRoot, 'get-starter.md'))).toBe(true)
    expect(fs.existsSync(legacyRoot)).toBe(false)
  })

  it('从新目录读取内容后，依旧能区分 blog 与 daily', () => {
    expect(getAllPosts().length).toBeGreaterThan(0)
    expect(getRegularPosts().length).toBeGreaterThan(0)
    expect(getWeeklyPosts().length).toBeGreaterThan(0)
  })
})
