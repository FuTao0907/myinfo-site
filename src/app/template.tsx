import type { ReactNode } from 'react'

interface TemplateProps {
  children: ReactNode
}

/**
 * 作为 App Router 模板透传路由内容，具体过渡由持久壳层负责。
 */
export default function Template({ children }: TemplateProps) {
  return children
}
