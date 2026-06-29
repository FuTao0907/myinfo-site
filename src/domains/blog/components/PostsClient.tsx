'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

import type { PostMeta } from '~/shared/types/post'
import { CalendarDays, ICON_SIZE_SM, ICON_STROKE_WIDTH } from '~/shared/components/ui/icons'

interface PostsClientProps {
  posts: PostMeta[]
  title: string
  countLabel: string
  routePrefix: '/blog' | '/daily'
}

const DEFAULT_VISIBLE_TAG_COUNT = 8

/**
 * 生成文章页面中的标签列表。
 */
function buildTags(posts: PostMeta[]): string[] {
  return [
    '全部',
    ...Array.from(new Set(posts.flatMap((post) => post.tags).filter((tag) => tag !== '全部'))),
  ]
}

/**
 * 默认折叠标签时，返回当前应展示的标签列表。
 */
function getVisibleTags(tags: string[], currentTag: string, isExpanded: boolean): string[] {
  if (isExpanded || tags.length <= DEFAULT_VISIBLE_TAG_COUNT) {
    return tags
  }

  const collapsedTags = tags.slice(0, DEFAULT_VISIBLE_TAG_COUNT)

  // 当前选中的标签如果不在折叠范围内，仍然补进来，避免用户选中后看不到。
  if (currentTag !== '全部' && !collapsedTags.includes(currentTag) && tags.includes(currentTag)) {
    return [...collapsedTags, currentTag]
  }

  return collapsedTags
}

/**
 * 根据当前标签筛选文章列表。
 */
function filterPosts(posts: PostMeta[], currentTag: string): PostMeta[] {
  return posts.filter((post) => currentTag === '全部' || post.tags.includes(currentTag))
}

/**
 * 渲染文章卡片列表。
 */
function renderPostList(posts: PostMeta[], routePrefix: '/blog' | '/daily') {
  return (
    <ol className="mx-auto flex max-w-3xl list-none flex-col gap-4 p-0">
      {posts.map((article) => (
        <li key={article.id}>
          <Link
            href={`${routePrefix}/post/${article.id}`}
            className="block rounded-2xl border border-[var(--blog-card-border)] bg-[var(--blog-card-bg)] p-4 transition-colors hover:border-[var(--text-color)]/35 hover:bg-[var(--blog-card-bg)]/95 md:p-6"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold leading-8 text-[var(--blog-card-text)]">
                  {article.title}
                </h2>
                <p className="mt-2 max-w-[35em] text-sm leading-7 text-[#818188] dark:text-[#CECED1]">
                  {article.desc || '这篇文章暂时没有摘要，建议按标题和标签进入查看。'}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {article.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex min-h-8 items-center rounded-full border border-[var(--blog-card-border)] px-3 text-xs font-semibold text-[#7C7C82]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#7C7C82] md:shrink-0">
                <CalendarDays className={ICON_SIZE_SM} strokeWidth={ICON_STROKE_WIDTH} />
                <time dateTime={article.date}>{article.date}</time>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  )
}

/**
 * 渲染文章列表页，在当前无文章时展示空状态。
 */
export default function PostsClient({ posts, title, countLabel, routePrefix }: PostsClientProps) {
  const [currentTag, setCurrentTag] = useState('全部')
  const [isExpandedTags, setIsExpandedTags] = useState(false)

  const tags = useMemo(() => buildTags(posts), [posts])
  const visibleTags = useMemo(
    () => getVisibleTags(tags, currentTag, isExpandedTags),
    [currentTag, isExpandedTags, tags]
  )
  const filteredPosts = useMemo(() => filterPosts(posts, currentTag), [currentTag, posts])

  return (
    <div className="mx-auto block min-h-full w-full flex-1 scroll-m-20 px-4 md:px-6">
      <header
        className="relative mx-auto flex max-w-3xl flex-col gap-4 text-[var(--blog-card-text)]"
        style={{ fontFamily: 'LXGW WenKai Screen R, sans-serif' }}
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
          <p className="max-w-[35em] text-sm leading-7 text-[#7C7C82]">
            {routePrefix === '/blog'
              ? '这里保留适合快速开发时直接查阅的技术文章。'
              : '这里展示按时间整理的日常记录。'}
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--blog-card-border)] bg-[var(--blog-card-bg)] p-4">
          <ul className="-m-1 flex list-none flex-wrap justify-start">
            {visibleTags.map((tag) => (
              <li key={tag}>
                <button
                  type="button"
                  onClick={() => setCurrentTag(tag)}
                  style={{ border: '1px solid #E4E4E7' }}
                  className={`m-1 inline-flex appearance-none rounded-[6px] px-2 py-1 text-center text-xs/tight font-bold no-underline transition-colors ${
                    currentTag === tag
                      ? '!border-neutral-300 !bg-black !text-white dark:!border-[#52525B] dark:!bg-white dark:!text-black'
                      : 'bg-white text-neutral-500 hover:border-neutral-300 hover:bg-neutral-100 dark:border-[#3e3e3e] dark:bg-[rgb(24,24,27)] dark:hover:border-[#52525B] dark:hover:bg-[#27272A] dark:hover:text-[#E4E4E5]'
                  }`}
                >
                  #{tag}
                </button>
              </li>
            ))}
            {tags.length > DEFAULT_VISIBLE_TAG_COUNT && (
              <li>
                <button
                  type="button"
                  onClick={() => setIsExpandedTags((previous) => !previous)}
                  style={{ border: '1px solid #E4E4E7' }}
                  className="m-1 inline-flex appearance-none rounded-[6px] px-2 py-1 text-center text-xs/tight font-bold no-underline transition-colors bg-white text-neutral-500 hover:border-neutral-300 hover:bg-neutral-100 dark:border-[#3e3e3e] dark:bg-[rgb(24,24,27)] dark:hover:border-[#52525B] dark:hover:bg-[#27272A] dark:hover:text-[#E4E4E5]"
                >
                  {isExpandedTags ? '收起标签' : '展开更多'}
                </button>
              </li>
            )}
          </ul>
        </div>

        <p className="text-sm font-semibold text-[#7C7C82]">
          {filteredPosts.length} {countLabel}
        </p>
      </header>

      <div
        className="relative mt-6 text-[var(--blog-card-text)]"
        style={{ fontFamily: 'LXGW WenKai Screen R, sans-serif' }}
      >
        {filteredPosts.length > 0 ? (
          <div className="mx-auto max-w-3xl">{renderPostList(filteredPosts, routePrefix)}</div>
        ) : (
          <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-[var(--blog-card-border)] bg-[var(--blog-card-bg)] p-8 text-center">
            <p className="text-base font-semibold text-[var(--blog-card-text)]">没有找到匹配内容</p>
            <p className="mt-2 text-sm leading-7 text-[#7C7C82]">
              {routePrefix === '/blog'
                ? '当前暂无可显示的技术文章。'
                : '可以切回 `全部` 标签，或直接使用站点的全局搜索查找内容。'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
