import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import AppShell from '@/components/layouts/AppShell'
import { getSiteConfig } from '@/lib/public-content'
import { getSearchEntries } from '@/lib/search'

import '@/styles/globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig()

  return {
    title: siteConfig.siteProfile.siteTitle,
    description: siteConfig.siteProfile.description,
    keywords: siteConfig.siteProfile.keywords,
  }
}

interface RootLayoutProps {
  children: ReactNode
}

/**
 * 提供全站服务端根布局，并将交互壳层下沉到客户端组件。
 */
export default async function RootLayout({ children }: RootLayoutProps) {
  const siteConfig = await getSiteConfig()
  const searchEntries = getSearchEntries()

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className="relative min-h-screen transition-colors duration-300"
        style={{
          color: 'var(--text-color)',
          backgroundColor: 'var(--bg-main-color)',
        }}
      >
        <AppShell siteConfig={siteConfig} searchEntries={searchEntries}>
          {children}
        </AppShell>
      </body>
    </html>
  )
}
