'use client'

import type { ReactNode } from 'react'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import SiteHeader from '@/components/layouts/SiteHeader'
import SearchDialog from '@/components/features/search/SearchDialog'
import { SiteConfigProvider } from '@/components/providers/SiteConfigProvider'
import { ToastProvider } from '@/components/providers/ToastProvider'
import { COMMON_ASSETS, SITE_RECORDS } from '@/lib/constants/content/site'
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
  const isFullscreenRoute = pathname.startsWith('/resume')
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
          {!isFullscreenRoute ? <SiteHeader /> : null}
          <SearchDialog entries={searchEntries} />
          <main
            id="main-root"
            className={`relative z-10 flex-1 overflow-x-hidden ${
              isFullscreenRoute
                ? 'min-h-screen px-0 py-0'
                : 'min-h-[calc(100dvh-var(--site-header-height))] px-[10px] py-6 md:px-5 md:py-8'
            }`}
          >
            <div ref={contentRef} className="min-h-full">
              {children}
            </div>
          </main>
          {!isFullscreenRoute ? (
            <footer className="relative z-10 border-t border-[var(--card-border)]/70 px-4 py-4 md:px-6">
              <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-[var(--text-color)]/70 md:flex-row">
                <p className="m-0">
                  Copyright © {new Date().getFullYear()} {siteConfig.siteProfile.siteTitle}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:justify-end">
                  <a
                    href={SITE_RECORDS.icpRecordUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-[var(--text-color)]/75 underline-offset-4 transition-colors hover:text-[var(--text-color)] hover:underline"
                  >
                    <span>{SITE_RECORDS.icpRecordLabel}</span>
                  </a>
                  <a
                    href={SITE_RECORDS.policeRecordUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[var(--text-color)]/75 underline-offset-4 transition-colors hover:text-[var(--text-color)] hover:underline"
                  >
                    <Image
                      src={COMMON_ASSETS.beianBadge}
                      alt="公安备案图标"
                      width={20}
                      height={20}
                      className="h-5 w-5 rounded-sm"
                    />
                    <span>{SITE_RECORDS.policeRecordLabel}</span>
                  </a>
                </div>
              </div>
            </footer>
          ) : null}
        </div>
      </ToastProvider>
    </SiteConfigProvider>
  )
}
