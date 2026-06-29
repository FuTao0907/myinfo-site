export function openExternalLink(url?: string) {
  if (!url) {
    return false
  }

  if (typeof window === 'undefined') {
    return false
  }

  try {
    window.open(url, '_blank', 'noopener,noreferrer')
    return true
  } catch {
    return false
  }
}

