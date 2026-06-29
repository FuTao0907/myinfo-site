import { notFound } from 'next/navigation'

import PostClient from '~blog/components/PostClient'
import { getDailyPostDetail, getDailyPosts } from '~blog/lib/posts'

/**
 * 为日常文章详情页生成静态参数。
 */
export async function generateStaticParams() {
  const posts = await getDailyPosts()

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
  const post = await getDailyPostDetail(id)

  if (!post) {
    notFound()
  }

  return <PostClient post={post} />
}
