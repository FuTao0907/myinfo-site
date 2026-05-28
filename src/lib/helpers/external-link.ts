/**
 * 判断当前链接是否可以安全打开。
 */
export function canOpenExternalLink(url?: string): boolean {
  if (!url) {
    return false
  }

  const trimmedUrl = url.trim()

  if (!trimmedUrl) {
    return false
  }

  if (trimmedUrl.startsWith('mailto:')) {
    return trimmedUrl.length > 'mailto:'.length
  }

  try {
    const parsedUrl = new URL(trimmedUrl)

    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * 在链接有效时打开新窗口，否则返回失败。
 */
export function openExternalLink(url?: string): boolean {
  if (!canOpenExternalLink(url)) {
    return false
  }

  const trimmedUrl = url!.trim()

  if (trimmedUrl.startsWith('mailto:')) {
    window.location.href = trimmedUrl
    return true
  }

  window.open(trimmedUrl, '_blank', 'noopener,noreferrer')
  return true
}
