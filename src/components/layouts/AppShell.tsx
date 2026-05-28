'use client'

import type { ReactNode } from 'react'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

import SiteHeader from '@/components/layouts/SiteHeader'
import SearchDialog from '@/components/features/search/SearchDialog'
import { SiteConfigProvider } from '@/components/providers/SiteConfigProvider'
import { ToastProvider } from '@/components/providers/ToastProvider'
import type { SiteConfig } from '@/types/site-config'
import type { SearchEntry } from '@/types/search'

interface AppShellProps {
  children: ReactNode
  siteConfig: SiteConfig
  searchEntries: SearchEntry[]
}

interface RouteTransitionPreset {
  keyframes: Keyframe[]
  options: KeyframeAnimationOptions
}

/**
 * 根据当前设置返回路由切换动画配置。
 */
function getRouteTransitionPreset(transitionName: string): RouteTransitionPreset {
  switch (transitionName) {
    case 'translateY':
      return {
        keyframes: [
          { opacity: 0, transform: 'translateY(20px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        options: {
          duration: 100,
          easing: 'ease-out',
          fill: 'both',
        },
      }
    case 'fade':
      return {
        keyframes: [{ opacity: 0 }, { opacity: 1 }],
        options: {
          duration: 200,
          easing: 'ease',
          fill: 'both',
        },
      }
    case 'page':
    default:
      return {
        keyframes: [
          { opacity: 0, filter: 'blur(1rem)' },
          { opacity: 1, filter: 'blur(0)' },
        ],
        options: {
          duration: 400,
          easing: 'ease',
          fill: 'both',
        },
      }
  }
}

/**
 * 提供站点通用头部和主内容容器。
 */
export default function AppShell({ children, siteConfig, searchEntries }: AppShellProps) {
  const pathname = usePathname() || '/'
  const [transitionName, setTransitionName] = useState('page')
  const [hasMounted, setHasMounted] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const previousPathnameRef = useRef<string | null>(null)

  useEffect(() => {
    const syncTransitionName = () => {
      setTransitionName(localStorage.getItem('currentTransitionName') || 'page')
    }

    syncTransitionName()
    setHasMounted(true)
    window.addEventListener('transitionNameChange', syncTransitionName)

    return () => {
      window.removeEventListener('transitionNameChange', syncTransitionName)
    }
  }, [])

  useEffect(() => {
    if (!hasMounted) {
      return
    }

    if (previousPathnameRef.current === null) {
      previousPathnameRef.current = pathname
      return
    }

    if (previousPathnameRef.current === pathname) {
      return
    }

    previousPathnameRef.current = pathname

    window.scrollTo({ top: 0, behavior: 'auto' })

    const element = contentRef.current

    if (!element) {
      return
    }

    const preset = getRouteTransitionPreset(transitionName)
    const animation = element.animate(preset.keyframes, preset.options)

    return () => {
      animation.cancel()
    }
  }, [hasMounted, pathname, transitionName])

  return (
    <SiteConfigProvider value={siteConfig}>
      <ToastProvider>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <SearchDialog entries={searchEntries} />
          <main
            id="main-root"
            className="relative z-10 min-h-[calc(100dvh-var(--site-header-height))] flex-1 overflow-x-hidden px-[10px] py-6 md:px-5 md:py-8"
          >
            <div ref={contentRef} className="min-h-full">
              {children}
            </div>
          </main>
        </div>
      </ToastProvider>
    </SiteConfigProvider>
  )
}
