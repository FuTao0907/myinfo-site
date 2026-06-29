import { afterEach, describe, expect, it } from 'vitest'

import { lockBodyScroll, unlockBodyScroll } from '~/shared/lib/utils/body-scroll-lock'

interface MockBody {
  style: { overflow: string }
  getAttribute: (name: string) => string | null
  setAttribute: (name: string, value: string) => void
  removeAttribute: (name: string) => void
}

const originalDocument = globalThis.document

/**
 * 创建一个只包含滚动锁测试所需能力的 body mock。
 */
function createMockBody(): MockBody {
  const attributes = new Map<string, string>()

  return {
    style: {
      overflow: '',
    },
    getAttribute(name: string) {
      return attributes.get(name) ?? null
    },
    setAttribute(name: string, value: string) {
      attributes.set(name, value)
    },
    removeAttribute(name: string) {
      attributes.delete(name)
    },
  }
}

/**
 * 将 mock document 注入到当前测试环境。
 */
function installMockDocument() {
  const body = createMockBody()

  Object.defineProperty(globalThis, 'document', {
    configurable: true,
    value: {
      body,
    },
  })

  return body
}

afterEach(() => {
  Object.defineProperty(globalThis, 'document', {
    configurable: true,
    value: originalDocument,
  })
})

describe('body-scroll-lock', () => {
  it('在首次加锁时写入计数并锁定滚动', () => {
    const body = installMockDocument()

    lockBodyScroll()

    expect(body.getAttribute('data-body-scroll-lock-count')).toBe('1')
    expect(body.style.overflow).toBe('hidden')
  })

  it('在多次加锁后只会在最后一次解锁时恢复滚动', () => {
    const body = installMockDocument()

    lockBodyScroll()
    lockBodyScroll()
    unlockBodyScroll()

    expect(body.getAttribute('data-body-scroll-lock-count')).toBe('1')
    expect(body.style.overflow).toBe('hidden')

    unlockBodyScroll()

    expect(body.getAttribute('data-body-scroll-lock-count')).toBeNull()
    expect(body.style.overflow).toBe('')
  })
})
