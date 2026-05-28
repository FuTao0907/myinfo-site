'use client'

import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import type { SiteConfig } from '@/types/site-config'

const SiteConfigContext = createContext<SiteConfig | null>(null)

type SiteConfigProviderProps = {
  value: SiteConfig
  children: ReactNode
}

/** 为前台客户端组件提供站点配置上下文。 */
export function SiteConfigProvider({ value, children }: SiteConfigProviderProps) {
  return <SiteConfigContext.Provider value={value}>{children}</SiteConfigContext.Provider>
}

/** 读取当前站点配置上下文。 */
export function useSiteConfig() {
  const context = useContext(SiteConfigContext)

  if (!context) {
    throw new Error('useSiteConfig must be used within SiteConfigProvider')
  }

  return context
}
