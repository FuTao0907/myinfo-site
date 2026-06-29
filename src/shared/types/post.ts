export interface PostMeta {
  id: string
  title: string
  plainTitle: string
  date: string
  desc: string
  tags: string[]
  cover: string
  content: string
  isWeekly: boolean
  postIndex: number
}

export interface PostFrontmatter {
  title?: string
  date?: string
  desc?: string
  tags?: string[]
  cover?: string
}
