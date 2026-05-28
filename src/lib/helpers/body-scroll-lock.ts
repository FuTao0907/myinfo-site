const BODY_SCROLL_LOCK_ATTR = 'data-body-scroll-lock-count'

/**
 * 为 body 增加滚动锁计数，避免多个弹层互相覆盖滚动状态。
 */
export function lockBodyScroll(): void {
  if (typeof document === 'undefined') {
    return
  }

  const body = document.body
  const currentCount = Number.parseInt(body.getAttribute(BODY_SCROLL_LOCK_ATTR) ?? '0', 10)
  const nextCount = Number.isNaN(currentCount) ? 1 : currentCount + 1

  body.setAttribute(BODY_SCROLL_LOCK_ATTR, String(nextCount))
  body.style.overflow = 'hidden'
}

/**
 * 释放 body 滚动锁，只有所有弹层都关闭后才恢复页面滚动。
 */
export function unlockBodyScroll(): void {
  if (typeof document === 'undefined') {
    return
  }

  const body = document.body
  const currentCount = Number.parseInt(body.getAttribute(BODY_SCROLL_LOCK_ATTR) ?? '0', 10)

  if (Number.isNaN(currentCount) || currentCount <= 1) {
    body.removeAttribute(BODY_SCROLL_LOCK_ATTR)
    body.style.overflow = ''
    return
  }

  body.setAttribute(BODY_SCROLL_LOCK_ATTR, String(currentCount - 1))
}
