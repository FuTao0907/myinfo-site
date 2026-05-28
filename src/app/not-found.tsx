import Link from 'next/link'

/**
 * 提供全局 404 页面。
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-bold text-[var(--text-color)]">页面未找到</h2>
      <p className="text-sm text-[var(--text-color)]/70">你访问的内容不存在或已经被移动。</p>
      <Link href="/" className="rounded-md border border-[var(--card-border)] px-4 py-2 text-sm">
        返回首页
      </Link>
    </div>
  )
}
