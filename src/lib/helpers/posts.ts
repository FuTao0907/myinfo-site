import fs from 'node:fs'
import path from 'node:path'
import { cache } from 'react'
import matter from 'gray-matter'

import type { PostFrontmatter, PostMeta } from '@/types/post'

const BLOG_ROOT = path.join(process.cwd(), 'src', 'blog')
const DEFAULT_COVER =
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop'
const DEFAULT_DATE = '2024/01/01'

/**
 * 递归收集指定目录下的所有 Markdown 文件。
 */
function getMarkdownFiles(directoryPath: string, files: string[] = []): string[] {
  if (!fs.existsSync(directoryPath)) {
    return files
  }

  for (const entry of fs.readdirSync(directoryPath)) {
    const entryPath = path.join(directoryPath, entry)
    const stat = fs.statSync(entryPath)

    if (stat.isDirectory()) {
      getMarkdownFiles(entryPath, files)
      continue
    }

    if (entry.endsWith('.md')) {
      files.push(entryPath)
    }
  }

  return files
}

/**
 * 根据文件名生成文章标题和排序序号。
 */
function resolvePostTitle(
  id: string,
  frontmatterTitle?: string
): Pick<PostMeta, 'title' | 'plainTitle' | 'postIndex'> {
  const plainTitle = frontmatterTitle || id
  const match = id.match(/^(\d+)-(.+)$/)

  if (!match) {
    return {
      title: plainTitle,
      plainTitle,
      postIndex: 0,
    }
  }

  const [, issue, titleName] = match

  return {
    title: `第${issue}期 - ${titleName}`,
    plainTitle,
    postIndex: Number.parseInt(issue, 10),
  }
}

/**
 * 将单个 Markdown 文件解析为统一的文章数据结构。
 */
function parsePostFile(filePath: string): PostMeta {
  const id = path.basename(filePath, '.md')
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  const frontmatter = data as PostFrontmatter
  const normalizedPath = filePath.replace(/\\/g, '/')
  const { title, plainTitle, postIndex } = resolvePostTitle(id, frontmatter.title)

  return {
    id,
    title,
    plainTitle,
    date: frontmatter.date || DEFAULT_DATE,
    desc: frontmatter.desc || '',
    tags: (frontmatter.tags || []).map((tag) => tag.replace(/^#/, '')),
    cover: frontmatter.cover || DEFAULT_COVER,
    content,
    isWeekly: normalizedPath.includes('/weekly/'),
    postIndex,
  }
}

/**
 * 读取并缓存所有文章，避免同一请求中重复扫描文件系统。
 */
export const getAllPosts = cache((): PostMeta[] => {
  return getMarkdownFiles(BLOG_ROOT)
    .filter((filePath) => path.basename(filePath) !== 'get-starter.md')
    .map(parsePostFile)
    .sort((left, right) => {
      if (left.postIndex !== right.postIndex) {
        return right.postIndex - left.postIndex
      }

      return new Date(right.date).getTime() - new Date(left.date).getTime()
    })
})

/**
 * 获取技术文章列表。
 */
export function getRegularPosts(): PostMeta[] {
  return getAllPosts().filter((post) => !post.isWeekly)
}

/**
 * 获取日常文章列表。
 */
export function getWeeklyPosts(): PostMeta[] {
  return getAllPosts().filter((post) => post.isWeekly)
}

/**
 * 根据文章 id 查询文章详情。
 */
export function getPostById(id: string): PostMeta | undefined {
  const decodedId = decodeURIComponent(id)

  return getAllPosts().find((post) => post.id === decodedId)
}

/**
 * 生成用于筛选展示的标签列表。
 */
export function getPostTags(posts: PostMeta[]): string[] {
  return ['全部', ...Array.from(new Set(posts.flatMap((post) => post.tags).filter((tag) => tag !== '全部')))]
}
