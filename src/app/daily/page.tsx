import PostsClient from '@/components/features/blog/PostsClient'
import { getPostsByType } from '@/lib/public-content'

/**
 * 渲染日常文章列表页。
 */
export default async function DailyPage() {
  return (
    <PostsClient
      posts={await getPostsByType('daily')}
      title="Daily"
      countLabel="daily notes"
      routePrefix="/daily"
    />
  )
}
