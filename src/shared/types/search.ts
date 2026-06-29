export interface SearchEntry {
  id: string
  title: string
  plainTitle: string
  description: string
  route: string
  section: 'blog' | 'daily'
  date: string
  tags: string[]
}
