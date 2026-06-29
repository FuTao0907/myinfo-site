import { notFound } from 'next/navigation'

import PostClient from '~blog/components/PostClient'
import { getBlogPostDetail, getBlogPosts } from '~blog/lib/posts'

/**
 * 为文章详情页生成静态参数。
 */
export async function generateStaticParams() {
  const posts = await getBlogPosts()

  return posts.map((post) => ({
    id: post.id,
  }))
}

interface BlogPostPageProps {
  params: Promise<{ id: string }>
}

/**
 * 渲染技术文章详情页。
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params
  const post = await getBlogPostDetail(id)

  if (!post) {
    notFound()
  }

  return <PostClient post={post} />
}
