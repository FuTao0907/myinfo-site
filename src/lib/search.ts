import { cache } from 'react'

import { getAllPosts } from '@/lib/helpers/posts'
import type { SearchEntry } from '@/types/search'

/**
 * 生成全站可搜索的轻量索引，供命令面板做前端过滤。
 */
export const getSearchEntries = cache((): SearchEntry[] => {
  return getAllPosts().map((post) => {
    const route = post.isWeekly ? `/daily/post/${post.id}` : `/blog/post/${post.id}`

    return {
      id: post.id,
      title: post.title,
      plainTitle: post.plainTitle,
      description: post.desc,
      route,
      section: post.isWeekly ? 'daily' : 'blog',
      date: post.date,
      tags: post.tags,
    }
  })
})
