const BODY_SCROLL_LOCK_ATTRIBUTE = 'data-body-scroll-lock-count'

function getLockCount(body: HTMLElement) {
  const rawCount = body.getAttribute(BODY_SCROLL_LOCK_ATTRIBUTE)
  const parsed = rawCount ? Number.parseInt(rawCount, 10) : 0
  return Number.isFinite(parsed) ? parsed : 0
}

export function lockBodyScroll() {
  if (typeof document === 'undefined' || !document.body) {
    return
  }

  const body = document.body
  const lockCount = getLockCount(body)
  const nextCount = lockCount + 1

  body.setAttribute(BODY_SCROLL_LOCK_ATTRIBUTE, String(nextCount))

  if (lockCount === 0) {
    body.style.overflow = 'hidden'
  }
}

export function unlockBodyScroll() {
  if (typeof document === 'undefined' || !document.body) {
    return
  }

  const body = document.body
  const lockCount = getLockCount(body)

  if (lockCount <= 1) {
    body.removeAttribute(BODY_SCROLL_LOCK_ATTRIBUTE)
    body.style.overflow = ''
    return
  }

  body.setAttribute(BODY_SCROLL_LOCK_ATTRIBUTE, String(lockCount - 1))
}

