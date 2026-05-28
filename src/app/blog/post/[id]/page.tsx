import { notFound } from 'next/navigation'

import PostClient from '@/components/features/blog/PostClient'
import { getPostDetail, getPostsByType } from '@/lib/public-content'

/**
 * 为文章详情页生成静态参数。
 */
export async function generateStaticParams() {
  const posts = await getPostsByType('blog')

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
  const post = await getPostDetail(id)

  if (!post || post.isWeekly) {
    notFound()
  }

  return <PostClient post={post} />
}
