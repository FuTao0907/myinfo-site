'use client'

import { CalendarDays } from 'lucide-react'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { CSSProperties } from 'react'

import type { PostMeta } from '@/types/post'

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
 * 渲染文章列表和卡片两种视图。
 */
export default function PostsClient({ posts, title, countLabel, routePrefix }: PostsClientProps) {
  const [isShowList, setIsShowList] = useState(true)
  const [currentTag, setCurrentTag] = useState('全部')
  const [isExpandedTags, setIsExpandedTags] = useState(false)

  const tags = useMemo(() => buildTags(posts), [posts])
  const visibleTags = useMemo(
    () => getVisibleTags(tags, currentTag, isExpandedTags),
    [currentTag, isExpandedTags, tags]
  )
  const filteredPosts = useMemo(() => {
    if (currentTag === '全部') {
      return posts
    }

    return posts.filter((post) => post.tags.includes(currentTag))
  }, [currentTag, posts])

  return (
    <div className="mx-auto block min-h-full w-full flex-1 flex-col scroll-m-20 px-6">
      <header
        className="relative mx-auto flex max-w-xl flex-col space-y-2 text-[var(--blog-card-text)]"
        style={{ fontFamily: 'LXGW WenKai Screen R, sans-serif' }}
      >
        <div
          className="relative w-fit cursor-pointer select-none text-3xl font-bold"
          onClick={() => setIsShowList((previous) => !previous)}
        >
          <div
            className="reverse-card transition-transform duration-500"
            style={{ transform: isShowList ? 'rotateY(0deg)' : 'rotateY(180deg)' }}
          >
            {title}
          </div>
          <div
            className="reverse-card absolute left-0 top-0 transition-transform duration-500"
            style={{ transform: !isShowList ? 'rotateY(0deg)' : 'rotateY(180deg)' }}
          >
            {title}
          </div>
        </div>

        <div>
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
        <br />
      </header>

      <div
        className="relative text-[var(--blog-card-text)]"
        style={{ fontFamily: 'LXGW WenKai Screen R, sans-serif' }}
      >
        <ol
          style={{ display: isShowList ? 'flex' : 'none' }}
          className="mx-auto mt-6 flex max-w-xl list-none flex-col space-y-6 p-0"
        >
          {filteredPosts.map((article) => (
            <li key={article.id}>
              <Link
                href={`${routePrefix}/post/${article.id}`}
                className="relative flex flex-col gap-1"
              >
                <h1 className="static inline-flex appearance-none items-center rounded-[6px] border-0 bg-transparent p-0 text-xl font-bold underline decoration-1 underline-offset-2 before:absolute before:left-0 before:top-0 before:block before:h-full before:w-full before:cursor-pointer hover:decoration-dotted focus:outline-none focus-visible:ring focus-visible:ring-neutral-300 focus:ring-0">
                  {article.title}
                </h1>

                <div className="flex flex-col gap-1.5 text-[#818188] dark:text-[#CECED1]">
                  <p className="m-0 text-[14px]">{article.desc}</p>
                  <div
                    className="text-sm"
                    style={
                      {
                        '--pm-gap-inner': '0.25em',
                        '--pm-gap-x': '1em',
                        '--pm-gap-y': '0.5em',
                        '--pm-icon-size': '1.25em',
                      } as CSSProperties
                    }
                  >
                    <dl className="-mx-[calc(var(--pm-gap-x)/2)] -my-[calc(var(--pm-gap-y)/2)] flex list-none flex-wrap justify-start text-[#A1A1A7] dark:text-[#97979F]">
                      <div className="flex items-center gap-[var(--pm-gap-inner)]">
                        <dt className="inline-flex items-center">
                          <span className="sr-only">Date</span>
                          <CalendarDays
                            className="h-[var(--pm-icon-size)] w-[var(--pm-icon-size)]"
                            strokeWidth={1.5}
                          />
                        </dt>
                        <dd className="m-0 ml-1">
                          <time dateTime={article.date}>{article.date}</time>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>

        {!isShowList && (
          <div className="mx-auto mt-6 grid max-w-[970px] grid-cols-[repeat(auto-fill,minmax(240px,1fr))] justify-center gap-[10px] rounded-[10px] px-[5px] text-start md:grid-cols-[repeat(auto-fill,minmax(240px,300px))] md:px-[25px]">
            {filteredPosts.map((article) => (
              <Link
                key={article.id}
                href={`${routePrefix}/post/${article.id}`}
                className="relative flex flex-col justify-center overflow-hidden rounded-[12px] border-[var(--blog-card-border)] border-solid bg-[var(--blog-card-bg)] pb-1 text-[var(--blog-card-text)] shadow-md"
                style={{ border: '5px solid var(--blog-card-border)' }}
              >
                <img
                  alt={article.title}
                  className="h-[200px] w-full rounded-t-md object-cover"
                  src={article.cover}
                />
                <div className="flex w-full items-center justify-between px-3 pt-2 leading-tight">
                  <div className="line-clamp-1 overflow-hidden font-bold">{article.title}</div>
                  <div className="ml-2 shrink-0 text-sm text-neutral-500">{article.date}</div>
                </div>
                <div className="line-clamp-2 h-12 w-full overflow-hidden px-3 pt-2 text-sm font-light text-neutral-500">
                  {article.desc}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
