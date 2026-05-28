import { notFound } from 'next/navigation'

import PostClient from '@/components/features/blog/PostClient'
import { getPostDetail, getPostsByType } from '@/lib/public-content'

/**
 * 为日常文章详情页生成静态参数。
 */
export async function generateStaticParams() {
  const posts = await getPostsByType('daily')

  return posts.map((post) => ({
    id: post.id,
  }))
}

interface DailyPostPageProps {
  params: Promise<{ id: string }>
}

/**
 * 渲染日常文章详情页。
 */
export default async function DailyPostPage({ params }: DailyPostPageProps) {
  const { id } = await params
  const post = await getPostDetail(id)

  if (!post || !post.isWeekly) {
    notFound()
  }

  return <PostClient post={post} />
}
