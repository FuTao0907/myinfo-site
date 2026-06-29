import { afterEach, describe, expect, it } from 'vitest'

import { getContentApiBaseUrl, getPublicEnv } from '@/env'

const originalEnv = {
  NEXT_PUBLIC_AMAP_KEY: process.env.NEXT_PUBLIC_AMAP_KEY,
  NEXT_PUBLIC_AMAP_SECURITY_JS_CODE: process.env.NEXT_PUBLIC_AMAP_SECURITY_JS_CODE,
  MYINFO_API_BASE_URL: process.env.MYINFO_API_BASE_URL,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
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

  if (originalEnv.MYINFO_API_BASE_URL === undefined) {
    delete process.env.MYINFO_API_BASE_URL
  } else {
    process.env.MYINFO_API_BASE_URL = originalEnv.MYINFO_API_BASE_URL
  }

  if (originalEnv.NEXT_PUBLIC_API_BASE_URL === undefined) {
    delete process.env.NEXT_PUBLIC_API_BASE_URL
  } else {
    process.env.NEXT_PUBLIC_API_BASE_URL = originalEnv.NEXT_PUBLIC_API_BASE_URL
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

  it('优先返回服务端内容接口地址，其次回退到公开地址和默认本地地址', () => {
    delete process.env.MYINFO_API_BASE_URL
    delete process.env.NEXT_PUBLIC_API_BASE_URL

    expect(getContentApiBaseUrl()).toBe('http://localhost:3001/api')

    process.env.NEXT_PUBLIC_API_BASE_URL = 'https://public.example.com/api'
    expect(getContentApiBaseUrl()).toBe('https://public.example.com/api')

    process.env.MYINFO_API_BASE_URL = 'https://server.example.com/api'
    expect(getContentApiBaseUrl()).toBe('https://server.example.com/api')
  })
})
