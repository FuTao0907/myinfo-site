'use client'

import { useEffect, useState } from 'react'

/**
 * 根据点击位置执行主题切换动画。
 */
function runThemeTransition(event: React.MouseEvent<HTMLElement>, nextIsDark: boolean) {
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

  const changeTheme = () => {
    document.documentElement.classList.toggle('dark', nextIsDark)
  }

  if (!document.startViewTransition) {
    changeTheme()
    return
  }

  const transition = document.startViewTransition(changeTheme)

  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]

    document.documentElement.animate(
      {
        clipPath: nextIsDark ? clipPath : [...clipPath].reverse(),
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: nextIsDark ? '::view-transition-new(root)' : '::view-transition-old(root)',
      }
    )
  })
}

/**
 * 提供站点级主题切换按钮。
 */
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const syncTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    document.documentElement.classList.add('dark')
    syncTheme()

    const observer = new MutationObserver(syncTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <button
      type="button"
      className="grid h-[40px] w-[40px] place-items-center cursor-pointer border-0 bg-transparent text-xl"
      onClick={(event) => runThemeTransition(event, !isDark)}
      aria-label={isDark ? '切换为浅色模式' : '切换为深色模式'}
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  )
}
