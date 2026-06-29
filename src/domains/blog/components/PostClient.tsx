'use client'

import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

import { SITE_LINKS } from '~/shared/lib/constants/content'
import type { PostMeta } from '~/shared/types/post'
import { ChevronUp, ICON_SIZE_LG, ICON_STROKE_WIDTH } from '~/shared/components/ui/icons'
import MarkdownRenderer from '~/domains/blog/components/MarkdownRenderer'

interface TocItem {
  id: string
  text: string
  level: number
}

interface PostClientProps {
  post: PostMeta
}

/**
 * 返回当前用于滚动监听的正文标题节点。
 */
function getTrackableHeadingElements(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>(
      '.toc-always-on h1[id], .toc-always-on h2[id], .toc-always-on h3[id]'
    )
  )
}

/**
 * 滚动目录面板，使当前高亮目录保持在可视区域中。
 */
function scrollToTocItem(container: HTMLElement | null, targetId: string) {
  if (!container) {
    return
  }

  const activeElement = document.getElementById(`toc-item-${targetId}`)

  if (!activeElement) {
    return
  }

  const navRect = container.getBoundingClientRect()
  const elementRect = activeElement.getBoundingClientRect()
  const targetScrollTop =
    container.scrollTop +
    (elementRect.top - navRect.top) -
    container.clientHeight / 2 +
    elementRect.height / 2

  container.scrollTo({
    top: targetScrollTop,
    behavior: 'smooth',
  })
}

/**
 * 渲染文章详情、知识目录和回到顶部按钮。
 */
export default function PostClient({ post }: PostClientProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState('')
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const tocNavRef = useRef<HTMLElement>(null)
  const isClickingToc = useRef(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const headingElements = document.querySelectorAll(
        '.toc-always-on h1[id], .toc-always-on h2[id], .toc-always-on h3[id]'
      )
      const headings = Array.from(headingElements).map((element) => ({
        id: element.id,
        text: element.textContent || '',
        level: Number.parseInt(element.tagName.charAt(1), 10),
      }))

      setToc(headings)
      setActiveId(headings[0]?.id ?? '')
    }, 100)

    return () => window.clearTimeout(timer)
  }, [post.content, post.id])

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [post.id])

  useEffect(() => {
    const handleScroll = () => {
      if (isClickingToc.current) {
        return
      }

      const headings = getTrackableHeadingElements()
      let currentActiveId = ''

      headings.forEach((heading) => {
        const top = heading.getBoundingClientRect().top

        if ((top >= 0 && top <= 150) || top < 0) {
          currentActiveId = heading.id
        }
      })

      if (currentActiveId && currentActiveId !== activeId) {
        setActiveId(currentActiveId)
        scrollToTocItem(tocNavRef.current, currentActiveId)
      }

      setShowBackToTop(window.scrollY > 300)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeId])

  /**
   * 渲染固定在视口右侧的目录面板，并通过 portal 脱离正文定位上下文。
   */
  const tocPortal =
    isMounted && toc.length > 0
      ? createPortal(
          <aside className="post-page-toc" aria-label="文章目录">
            <h4 className="mb-4 text-lg font-bold">文章目录</h4>
            <nav ref={tocNavRef} className="post-page-toc-nav scrollbar-hide">
              <ul className="m-0 list-none space-y-1 border-l-2 border-[var(--card-border)] border-solid p-0">
                {toc.map((item) => (
                  <li
                    key={item.id}
                    id={`toc-item-${item.id}`}
                    style={{ paddingLeft: `${(item.level - 1) * 12 + 12}px` }}
                    className="relative"
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => {
                        event.preventDefault()
                        isClickingToc.current = true
                        setActiveId(item.id)

                        const target = document.getElementById(item.id)
                        if (target) {
                          target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                          })
                          scrollToTocItem(tocNavRef.current, item.id)
                        }

                        window.setTimeout(() => {
                          isClickingToc.current = false
                        }, 800)
                      }}
                      className={`block w-full line-clamp-1 py-1 no-underline transition-colors hover:text-[var(--text-color)] ${
                        activeId === item.id
                          ? 'font-bold text-[var(--text-color)] before:absolute before:-left-[2px] before:top-1/2 before:h-4 before:w-[2px] before:-translate-y-1/2 before:bg-[var(--text-color)]'
                          : 'text-[#818188] dark:text-[#CECED1]'
                      }`}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>,
          document.body
        )
      : null

  return (
    <div className="post-page-layout">
      <style>{`
        .post-page-layout {
          position: relative;
          width: 100%;
        }
        .post-page-shell {
          width: 100%;
          margin: 0 auto;
        }
        .post-page-article {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 920px;
          margin: 0 auto;
          border-radius: 10px;
          background: var(--blog-card-bg);
          text-align: start;
          font-family: 'LXGW WenKai Screen R', sans-serif;
          padding: 10px 16px 0;
        }
        .post-page-toc {
          display: none;
        }
        .post-page-back-to-top {
          position: fixed;
          right: 16px;
          bottom: 32px;
          z-index: 50;
          display: flex;
          height: 48px;
          width: 48px;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background: var(--card--bg);
          color: var(--text-color);
          box-shadow: 0 0 0 2px var(--card-border);
        }
        .post-page-back-to-top:hover {
          transform: scale(1.1);
        }
        .post-page-content-card .prose img,
        .post-page-content-card .prose p > img {
          display: block;
          width: 100%;
          max-width: min(100%, 720px);
          margin-left: auto;
          margin-right: auto;
        }
        .post-page-content-card .prose p > img {
          margin-top: 2em;
          margin-bottom: 2em;
        }
        #blog-root::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url(/noise.png);
          background-repeat: repeat;
          opacity: 0.04;
          z-index: -1;
          pointer-events: none;
          user-select: none;
        }
        @keyframes slide-enter {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .slide-enter { animation: slide-enter 1s both 1; animation-delay: 50ms; }
        .slide-enter-2 { animation: slide-enter 1s both 1; animation-delay: 100ms; }
        .slide-enter-3 { animation: slide-enter 1s both 1; animation-delay: 150ms; }
        .slide-enter-4 { animation: slide-enter 1s both 1; animation-delay: 500ms; }
        @media (min-width: 768px) {
          .post-page-article {
            border: 1px solid var(--blog-card-border);
            padding: 32px 36px;
          }
          .post-page-back-to-top {
            right: 32px;
            bottom: 40px;
          }
        }
        @media (min-width: 1400px) {
          .post-page-toc {
            display: block;
            position: fixed;
            top: calc(var(--site-header-height) + 24px);
            right: max(24px, calc((100vw - 1540px) / 2));
            width: 260px;
            z-index: 30;
            pointer-events: auto;
          }
          .post-page-toc-nav {
            max-height: calc(100dvh - var(--site-header-height) - 48px);
            overflow-y: auto;
            padding-right: 4px;
            font-size: 0.875rem;
            pointer-events: auto;
          }
        }
      `}</style>
      <div className="post-page-shell">
        <main id="blog-root" className="post-page-article">
          <div className="prose m-auto mb-8 mt-6 max-w-[72ch]">
            <h1 className="slide-enter-2 mb-0">{post.plainTitle}</h1>
            <p className="slide-enter-2 opacity-50">{post.date}</p>
            <p className="slide-enter-3 text-[80%]">{post.desc}</p>
          </div>

          {post.tags.length > 0 ? (
            <section className="slide-enter-3 mx-auto mb-8 max-w-[72ch] rounded-2xl border border-[var(--blog-card-border)] bg-[var(--card--bg)]/45 p-4 md:p-5">
              <p className="text-sm font-semibold text-[var(--blog-card-text)]">文章标签</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex min-h-8 items-center rounded-full border border-[var(--blog-card-border)] px-3 text-xs font-semibold text-[#7C7C82]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          <div className="slide-enter-3 toc-always-on mx-auto max-w-[72ch]">
            <article className="post-page-content-card rounded-2xl border border-[var(--blog-card-border)] bg-[var(--blog-card-bg)] p-4 md:p-5">
              <MarkdownRenderer content={post.content} />
            </article>
          </div>

          <div className="prose slide-enter-4 m-auto mt-8 max-w-[72ch] animate-delay-500 print:hidden">
            <div className="mb-[10px] flex flex-col items-center justify-between font-mono opacity-50 hover:opacity-75 md:flex-row">
              <div className="flex-1">发布日期: {post.date}</div>
              <div className="mt-4 flex-1 text-right md:mt-0">
                <a
                  href={SITE_LINKS.articleGithubHome}
                  title="Star"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden !border-none lg:inline-block"
                >
                  Github
                </a>
              </div>
            </div>
          </div>

          <div className="prose slide-enter-4 m-auto mb-8 max-w-[72ch] animate-delay-500 print:hidden">
            <br />
            <span className="font-mono opacity-50">{'> '}</span>
            <Link
              href={post.isWeekly ? '/daily' : '/blog'}
              className="ml-1 !border-none font-mono opacity-50 transition-opacity hover:opacity-75"
            >
              cd ..
            </Link>
            <div className="py-4" />
          </div>
        </main>
      </div>

      {tocPortal}

      {isMounted &&
        createPortal(
          <AnimatePresence>
            {showBackToTop && (
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="post-page-back-to-top"
                aria-label="Back to top"
              >
                <ChevronUp className={ICON_SIZE_LG} strokeWidth={ICON_STROKE_WIDTH} />
              </motion.button>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  )
}
