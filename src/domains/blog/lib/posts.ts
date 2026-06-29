import { getPostDetail, getPostsByType } from '~/shared/lib/public-content'
import type { PostMeta } from '~/shared/types/post'

/**
 * Returns the blog post list for the blog route layer.
 */
export async function getBlogPosts(): Promise<PostMeta[]> {
  return getPostsByType('blog')
}

/**
 * Returns the daily post list for the daily route layer.
 */
export async function getDailyPosts(): Promise<PostMeta[]> {
  return getPostsByType('daily')
}

/**
 * Returns a blog post detail and filters out daily entries.
 */
export async function getBlogPostDetail(id: string): Promise<PostMeta | undefined> {
  const post = await getPostDetail(id)

  if (!post || post.isWeekly) {
    return undefined
  }

  return post
}

/**
 * Returns a daily post detail and filters out blog entries.
 */
export async function getDailyPostDetail(id: string): Promise<PostMeta | undefined> {
  const post = await getPostDetail(id)

  if (!post || !post.isWeekly) {
    return undefined
  }

  return post
}
