'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useSiteConfig } from '~/shared/components/providers/SiteConfigProvider'

/**
 * 渲染顶部导航，并根据当前路由高亮对应入口。
 */
export default function SiteNavigation() {
  const pathname = usePathname() || '/'
  const { navItems } = useSiteConfig()
  const highlightRef = useRef<HTMLDivElement>(null)
  const [currentItemIndex, setCurrentItemIndex] = useState(-1)
  const [isDark, setIsDark] = useState(false)
  const activeNavItems = navItems.filter((item) => item.isEnabled).sort((a, b) => a.sort - b.sort)

  useEffect(() => {
    const syncTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    syncTheme()

    const observer = new MutationObserver(syncTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const index = activeNavItems.findIndex((item) => {
      if (item.route === '/') {
        return pathname === '/'
      }

      return pathname.startsWith(item.route)
    })

    setCurrentItemIndex(index)

    highlightRef.current?.animate(
      {
        transform: [
          'scale3d(1, 1, 1)',
          'scale3d(1.25, 0.75, 1)',
          'scale3d(0.75, 1.25, 1)',
          'scale3d(1.15, 0.85, 1)',
          'scale3d(0.95, 1.05, 1)',
          'scale3d(1.05, 0.95, 1)',
          'scale3d(1, 1, 1)',
        ],
      },
      { duration: 900, fill: 'forwards' }
    )
  }, [activeNavItems, pathname])

  return (
    <div className="nav-container">
      {activeNavItems.map((item) => (
        <Link
          key={`${item.route}-${item.label}`}
          href={item.route}
          className="nav-item"
          style={{
            height: '28px',
            width: '80px',
            mixBlendMode: isDark ? 'unset' : 'difference',
          }}
        >
          {item.label}
        </Link>
      ))}

      <div
        style={{
          width: '80px',
          height: '28px',
          transform: `translate(${currentItemIndex * 80 + 5}px, 5px)`,
        }}
        className="pointer-events-none absolute left-0 top-0 transition-transform duration-300 ease-in-out"
      >
        <div
          ref={highlightRef}
          className="h-full w-full rounded-[50px] bg-[var(--nav-placeholder-bg)]"
        />
      </div>
    </div>
  )
}
