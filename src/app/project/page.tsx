import ProjectsClient from '@/components/features/project/ProjectsClient'
import { getProjects } from '@/lib/public-content'

/**
 * 渲染项目列表页。
 */
export default async function ProjectPage() {
  return <ProjectsClient projects={await getProjects()} />
}
