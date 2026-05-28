/**
 * 提供全局路由切换中的加载占位。
 */
export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-3xl items-center justify-center text-sm text-[var(--text-color)]/70">
      页面加载中...
    </div>
  )
}
