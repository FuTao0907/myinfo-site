'use client'

interface ErrorPageProps {
  error: Error
  reset: () => void
}

/**
 * 提供全局错误边界页面。
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-bold text-[var(--text-color)]">页面发生错误</h2>
      <p className="max-w-xl text-sm text-[var(--text-color)]/70">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md border border-[var(--card-border)] px-4 py-2 text-sm"
      >
        重试
      </button>
    </div>
  )
}
