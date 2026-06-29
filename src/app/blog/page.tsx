import PostsClient from '~blog/components/PostsClient'
import { getBlogPosts } from '~blog/lib/posts'

/**
 * 渲染技术文章列表页。
 */
export default async function BlogPage() {
  return (
    <PostsClient posts={await getBlogPosts()} title="Blog" countLabel="posts" routePrefix="/blog" />
  )
}
