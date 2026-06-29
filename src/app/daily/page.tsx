import PostsClient from '~blog/components/PostsClient'
import { getDailyPosts } from '~blog/lib/posts'

/**
 * 渲染日常文章列表页。
 */
export default async function DailyPage() {
  return (
    <PostsClient
      posts={await getDailyPosts()}
      title="Daily"
      countLabel="daily notes"
      routePrefix="/daily"
    />
  )
}
