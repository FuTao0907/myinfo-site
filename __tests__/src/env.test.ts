import { afterEach, describe, expect, it } from 'vitest'

import { getPublicEnv } from '@/env'

const originalEnv = {
  NEXT_PUBLIC_AMAP_KEY: process.env.NEXT_PUBLIC_AMAP_KEY,
  NEXT_PUBLIC_AMAP_SECURITY_JS_CODE: process.env.NEXT_PUBLIC_AMAP_SECURITY_JS_CODE,
}

/**
 * 重置测试中改写的公开环境变量，避免污染后续用例。
 */
function restorePublicEnv() {
  if (originalEnv.NEXT_PUBLIC_AMAP_KEY === undefined) {
    delete process.env.NEXT_PUBLIC_AMAP_KEY
  } else {
    process.env.NEXT_PUBLIC_AMAP_KEY = originalEnv.NEXT_PUBLIC_AMAP_KEY
  }

  if (originalEnv.NEXT_PUBLIC_AMAP_SECURITY_JS_CODE === undefined) {
    delete process.env.NEXT_PUBLIC_AMAP_SECURITY_JS_CODE
  } else {
    process.env.NEXT_PUBLIC_AMAP_SECURITY_JS_CODE = originalEnv.NEXT_PUBLIC_AMAP_SECURITY_JS_CODE
  }
}

afterEach(() => {
  restorePublicEnv()
})

describe('env', () => {
  it('在公开地图配置缺失时直接抛出错误', () => {
    delete process.env.NEXT_PUBLIC_AMAP_KEY
    delete process.env.NEXT_PUBLIC_AMAP_SECURITY_JS_CODE

    expect(() => getPublicEnv()).toThrowError('Missing NEXT_PUBLIC_AMAP_KEY')
  })

  it('在公开地图配置齐全时返回结构化结果', () => {
    process.env.NEXT_PUBLIC_AMAP_KEY = 'demo-key'
    process.env.NEXT_PUBLIC_AMAP_SECURITY_JS_CODE = 'demo-code'

    expect(getPublicEnv()).toEqual({
      amapKey: 'demo-key',
      amapSecurityJsCode: 'demo-code',
    })
  })
})
