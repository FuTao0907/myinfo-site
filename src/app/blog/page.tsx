import PostsClient from '@/components/features/blog/PostsClient'
import { getPostsByType } from '@/lib/public-content'

/**
 * 渲染技术文章列表页。
 */
export default async function BlogPage() {
  return (
    <PostsClient
      posts={await getPostsByType('blog')}
      title="Blog"
      countLabel="posts"
      routePrefix="/blog"
    />
  )
}
