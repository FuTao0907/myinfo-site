import ProjectsClient from '~project/components/ProjectsClient'
import { getProjects } from '~project/lib/projects'

/**
 * 渲染项目列表页。
 */
export default async function ProjectPage() {
  return <ProjectsClient projects={await getProjects()} />
}
