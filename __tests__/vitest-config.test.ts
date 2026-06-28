import { describe, expect, it } from 'vitest'

import vitestConfig from '../vitest.config'

describe('vitest config', () => {
  it('只扫描 __tests__ 目录下的测试文件', () => {
    expect(vitestConfig.test?.include).toEqual(['__tests__/**/*.test.ts'])
  })
})
