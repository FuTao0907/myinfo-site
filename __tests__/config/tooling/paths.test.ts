import path from 'node:path'

import { describe, expect, it } from 'vitest'

import * as pathsModule from '../../../config/tooling/paths.mjs'

describe('tooling paths', () => {
  it('提供给 TypeScript 使用的路径别名映射', () => {
    expect(typeof pathsModule.getTypeScriptPathAliases).toBe('function')
  })

  it('提供给 Vitest 使用的绝对路径别名映射', () => {
    expect(typeof pathsModule.getVitestAliasEntries).toBe('function')
  })

  it('能够生成稳定的 Vitest 别名结果', () => {
    expect(typeof pathsModule.getVitestAliasEntries).toBe('function')

    const aliases = pathsModule.getVitestAliasEntries?.('E:/study/Myinfo/myinfo-site')

    expect(aliases).toEqual({
      '@': path.join('E:/study/Myinfo/myinfo-site', 'src'),
      '~': path.join('E:/study/Myinfo/myinfo-site', 'src'),
      '~app': path.join('E:/study/Myinfo/myinfo-site', 'src', 'app'),
      '~shared': path.join('E:/study/Myinfo/myinfo-site', 'src', 'shared'),
      '~domains': path.join('E:/study/Myinfo/myinfo-site', 'src', 'domains'),
      '~blog': path.join('E:/study/Myinfo/myinfo-site', 'src', 'domains', 'blog'),
      '~home': path.join('E:/study/Myinfo/myinfo-site', 'src', 'domains', 'home'),
      '~project': path.join('E:/study/Myinfo/myinfo-site', 'src', 'domains', 'project'),
      '~resume': path.join('E:/study/Myinfo/myinfo-site', 'src', 'domains', 'resume'),
      '~search': path.join('E:/study/Myinfo/myinfo-site', 'src', 'domains', 'search'),
      '~site': path.join('E:/study/Myinfo/myinfo-site', 'src', 'domains', 'site'),
    })
  })
})
