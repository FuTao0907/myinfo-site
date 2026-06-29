import type { SearchEntry } from '~/shared/types/search'
import { getAllPosts } from '~/shared/lib/utils/posts'
import { cache } from 'react'

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
