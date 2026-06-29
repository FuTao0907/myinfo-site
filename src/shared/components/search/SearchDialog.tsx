'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { lockBodyScroll, unlockBodyScroll } from '~/shared/lib/utils/body-scroll-lock'
import type { SearchEntry } from '~/shared/types/search'
import { ICON_SIZE_MD, ICON_STROKE_WIDTH, Search } from '~/shared/components/ui/icons'

interface SearchDialogProps {
  entries: SearchEntry[]
}

const MAX_RESULT_COUNT = 8

/**
 * 根据关键词对搜索项进行简单评分，标题命中优先级更高。
 */
function getSearchScore(entry: SearchEntry, keyword: string): number {
  const normalizedKeyword = keyword.trim().toLowerCase()

  if (!normalizedKeyword) {
    return 0
  }

  const title = entry.plainTitle.toLowerCase()
  const description = entry.description.toLowerCase()
  const tagsText = entry.tags.join(' ').toLowerCase()

  let score = 0

  if (title === normalizedKeyword) score += 120
  if (title.startsWith(normalizedKeyword)) score += 80
  if (title.includes(normalizedKeyword)) score += 50
  if (description.includes(normalizedKeyword)) score += 20
  if (tagsText.includes(normalizedKeyword)) score += 10

  return score
}

/**
 * 渲染全局搜索弹层，并通过 Ctrl+K 快捷键唤起。
 */
export default function SearchDialog({ entries }: SearchDialogProps) {
  const pathname = usePathname()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  /**
   * 关闭搜索弹层并重置本地交互状态。
   */
  const closeSearch = useCallback(() => {
    setIsOpen(false)
    setKeyword('')
    setActiveIndex(0)
  }, [])

  /**
   * 进入搜索结果，命中当前同一路由时也立即关闭弹层。
   */
  const handleSelectEntry = useCallback(
    (route: string) => {
      closeSearch()
      router.push(route)
    },
    [closeSearch, router]
  )

  const results = useMemo(() => {
    const normalizedKeyword = keyword.trim()

    if (!normalizedKeyword) {
      return entries.slice(0, MAX_RESULT_COUNT)
    }

    return [...entries]
      .map((entry) => ({
        entry,
        score: getSearchScore(entry, normalizedKeyword),
      }))
      .filter((item) => item.score > 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, MAX_RESULT_COUNT)
      .map((item) => item.entry)
  }, [entries, keyword])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isSearchShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k'

      if (isSearchShortcut) {
        event.preventDefault()
        setIsOpen(true)
        return
      }

      if (!isOpen) {
        return
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        closeSearch()
        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIndex((previous) => Math.min(previous + 1, Math.max(results.length - 1, 0)))
        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((previous) => Math.max(previous - 1, 0))
        return
      }

      if (event.key === 'Enter') {
        const currentEntry = results[activeIndex]

        if (!currentEntry) {
          return
        }

        event.preventDefault()
        handleSelectEntry(currentEntry.route)
      }
    }

    const handleOpenSearch = () => {
      setIsOpen(true)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('site-search-open', handleOpenSearch)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('site-search-open', handleOpenSearch)
    }
  }, [activeIndex, closeSearch, handleSelectEntry, isOpen, results])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const timer = window.setTimeout(() => {
      inputRef.current?.focus()
    }, 0)

    return () => {
      window.clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    closeSearch()
  }, [closeSearch, pathname])

  useEffect(() => {
    setActiveIndex(0)
  }, [keyword])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    lockBodyScroll()

    return () => {
      unlockBodyScroll()
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="search-dialog-overlay fixed inset-0 z-[120] flex items-start justify-center px-4 pt-[12vh]"
      onClick={closeSearch}
    >
      <div
        className="search-dialog-panel w-full max-w-2xl overflow-hidden rounded-2xl border"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b px-4 py-4">
          <div className="search-dialog-field flex items-center gap-3 rounded-xl border px-4 py-3">
            <Search
              className={`search-dialog-muted ${ICON_SIZE_MD} shrink-0`}
              strokeWidth={ICON_STROKE_WIDTH}
            />
            <input
              ref={inputRef}
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="搜索文章、日常、标签"
              className="search-dialog-input w-full bg-transparent text-sm outline-none"
            />
            <span className="search-dialog-kbd rounded-md border px-2 py-1 text-xs">Ctrl K</span>
          </div>
        </div>

        <div className="max-h-[420px] overflow-y-auto p-2">
          {results.length > 0 ? (
            <ul className="flex list-none flex-col gap-1 p-0">
              {results.map((entry, index) => (
                <li key={`${entry.section}-${entry.id}`}>
                  <Link
                    href={entry.route}
                    onClick={(event) => {
                      event.preventDefault()
                      handleSelectEntry(entry.route)
                    }}
                    className={`search-dialog-item block rounded-xl px-4 py-3 transition-colors ${
                      activeIndex === index ? 'search-dialog-item-active' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{entry.plainTitle}</div>
                        <p className="search-dialog-muted mt-1 line-clamp-2 text-xs">
                          {entry.description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="search-dialog-tag rounded-md border px-2 py-0.5 text-[11px]">
                            {entry.section === 'blog' ? '文章' : '日常'}
                          </span>
                          {entry.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="search-dialog-tag rounded-md border px-2 py-0.5 text-[11px]"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="search-dialog-muted shrink-0 text-xs">{entry.date}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="search-dialog-muted flex min-h-[240px] items-center justify-center text-sm">
              没有找到匹配内容
            </div>
          )}
        </div>

        <div className="search-dialog-muted flex items-center justify-between border-t px-4 py-3 text-xs">
          <span>回车进入结果，Esc 关闭</span>
          <span>先做轻量搜索，后面可以继续优化结果排序和高亮</span>
        </div>
      </div>
    </div>
  )
}
