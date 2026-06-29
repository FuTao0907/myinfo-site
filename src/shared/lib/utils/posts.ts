import fs from 'node:fs'
import path from 'node:path'

import matter from 'gray-matter'

import { COMMON_ASSETS } from '~/shared/lib/constants/content/index'
import type { PostFrontmatter, PostMeta } from '~/shared/types/post'

const BLOG_ROOT = path.join(process.cwd(), 'src', 'domains', 'blog', 'content')
const DEFAULT_COVER = COMMON_ASSETS.defaultPostCover
const DEFAULT_DATE = '2024/01/01'

function parsePostIndex(fileName: string) {
  const match = /^(\d+)/.exec(fileName)
  if (!match) {
    return 0
  }

  const parsed = Number.parseInt(match[1], 10)
  return Number.isFinite(parsed) ? parsed : 0
}

function readMarkdownFile(filePath: string) {
  return fs.readFileSync(filePath, 'utf8')
}

function normalizeTags(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter((item): item is string => typeof item === 'string')
}

function mapFrontmatterToMeta(
  id: string,
  fileContent: string,
  options: { isWeekly: boolean; postIndex: number }
): PostMeta {
  const { data, content } = matter(fileContent)
  const frontmatter = data as PostFrontmatter

  const title = typeof frontmatter.title === 'string' ? frontmatter.title : id
  const plainTitle = title.replace(/<[^>]+>/g, '')

  return {
    id,
    title,
    plainTitle,
    date: typeof frontmatter.date === 'string' ? frontmatter.date : DEFAULT_DATE,
    desc: typeof frontmatter.desc === 'string' ? frontmatter.desc : '',
    tags: normalizeTags(frontmatter.tags),
    cover: typeof frontmatter.cover === 'string' ? frontmatter.cover : DEFAULT_COVER,
    content,
    isWeekly: options.isWeekly,
    postIndex: options.postIndex,
  }
}

function collectMarkdownFiles(directoryPath: string): string[] {
  if (!fs.existsSync(directoryPath)) {
    return []
  }

  return fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directoryPath, entry.name)

    if (entry.isDirectory()) {
      return collectMarkdownFiles(entryPath)
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      return [entryPath]
    }

    return []
  })
}

function getPostFilesByType(type: 'post' | 'weekly') {
  return collectMarkdownFiles(path.join(BLOG_ROOT, type))
}

export function getAllPosts(): PostMeta[] {
  const regularPostFiles = getPostFilesByType('post')
  const weeklyPostFiles = getPostFilesByType('weekly')

  const regularPosts = regularPostFiles.map((filePath) => {
    const fileName = path.basename(filePath, '.md')
    return mapFrontmatterToMeta(fileName, readMarkdownFile(filePath), {
      isWeekly: false,
      postIndex: parsePostIndex(fileName),
    })
  })

  const weeklyPosts = weeklyPostFiles.map((filePath) => {
    const fileName = path.basename(filePath, '.md')
    return mapFrontmatterToMeta(fileName, readMarkdownFile(filePath), {
      isWeekly: true,
      postIndex: parsePostIndex(fileName),
    })
  })

  const allPosts = [...regularPosts, ...weeklyPosts].filter((post) => post.id !== 'get-starter')

  return allPosts.sort((a, b) => b.postIndex - a.postIndex)
}

export function getRegularPosts(): PostMeta[] {
  return getAllPosts().filter((post) => !post.isWeekly)
}

export function getWeeklyPosts(): PostMeta[] {
  return getAllPosts().filter((post) => post.isWeekly)
}

export function getPostById(id: string): PostMeta | undefined {
  const decodedId = (() => {
    try {
      return decodeURIComponent(id)
    } catch {
      return id
    }
  })()

  return getAllPosts().find((post) => post.id === decodedId)
}

export function getPostTags(posts: PostMeta[]) {
  const tags = posts.flatMap((post) => post.tags).filter(Boolean)
  const uniqueTags = Array.from(new Set(tags.filter((tag) => tag !== '全部')))
  return ['全部', ...uniqueTags]
}

