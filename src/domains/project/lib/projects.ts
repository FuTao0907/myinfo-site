import { getProjects as getPublicProjects } from '~/shared/lib/public-content'
import type { ProjectItem } from '~/shared/types/site-config'

/**
 * Returns the project list for the project route layer.
 */
export async function getProjects(): Promise<ProjectItem[]> {
  return getPublicProjects()
}
