import { describe, expect, it } from 'vitest'

import { getAllPosts, getPostById, getPostTags, getRegularPosts, getWeeklyPosts } from '@/lib/helpers/posts'

/**
 * 返回一篇可用于详情查询断言的真实文章。
 */
function getExistingPostSample() {
  const posts = getAllPosts()
  const sample = posts[0]

  if (!sample) {
    throw new Error('当前仓库中没有可供测试的文章内容')
  }

  return sample
}

describe('posts helper', () => {
  it('能够读取本地 markdown，并排除 get-starter 说明文件', () => {
    const posts = getAllPosts()

    expect(posts.length).toBeGreaterThan(0)
    expect(posts.some((post) => post.id === 'get-starter')).toBe(false)
  })

  it('能够按 weekly 字段正确区分技术文章和日常文章', () => {
    const regularPosts = getRegularPosts()
    const weeklyPosts = getWeeklyPosts()

    expect(regularPosts.length).toBeGreaterThan(0)
    expect(weeklyPosts.length).toBeGreaterThan(0)
    expect(regularPosts.every((post) => !post.isWeekly)).toBe(true)
    expect(weeklyPosts.every((post) => post.isWeekly)).toBe(true)
  })

  it('能够使用原始 id 和编码后的 id 查询文章详情', () => {
    const sample = getExistingPostSample()

    expect(getPostById(sample.id)?.id).toBe(sample.id)
    expect(getPostById(encodeURIComponent(sample.id))?.id).toBe(sample.id)
  })

  it('能够生成去重后的标签列表，并始终把全部放在第一位', () => {
    const tags = getPostTags([
      {
        id: '1-demo',
        title: 'demo',
        plainTitle: 'demo',
        date: '2026/05/19',
        desc: '',
        tags: ['全部', 'JavaScript', 'JavaScript', '手册'],
        cover: '',
        content: '',
        isWeekly: false,
        postIndex: 1,
      },
      {
        id: '2-demo',
        title: 'demo 2',
        plainTitle: 'demo 2',
        date: '2026/05/19',
        desc: '',
        tags: ['手册', 'HTML'],
        cover: '',
        content: '',
        isWeekly: false,
        postIndex: 2,
      },
    ])

    expect(tags[0]).toBe('全部')
    expect(tags).toEqual(['全部', 'JavaScript', '手册', 'HTML'])
  })
})
