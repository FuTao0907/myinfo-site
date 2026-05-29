import type { Metadata } from 'next'

import ResumePageClient, {
  type ResumeEducation,
  type ResumeExperience,
  type ResumeProject,
} from '@/components/features/resume/ResumePageClient'
import {
  RESUME_EDUCATIONS,
  RESUME_EXPERIENCES,
  RESUME_PROFILE_CONFIG,
  RESUME_PROJECTS,
  RESUME_SKILL_GROUPS,
} from '@/lib/constants/content/index'
import { getProjects, getSiteConfig } from '@/lib/public-content'

/**
 * 生成简历页元数据。
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${RESUME_PROFILE_CONFIG.name} - 简历`,
    description: `${RESUME_PROFILE_CONFIG.name} 的个人简历页面`,
  }
}

/**
 * 将站内项目数据转换为简历页可复用的个人项目条目。
 */
function buildPersonalResumeProjects(
  projects: Awaited<ReturnType<typeof getProjects>>
): ResumeProject[] {
  return projects
    .filter((project) => project.status === 'published')
    .map((project) => ({
      name: project.name,
      role: '个人项目',
      duration: '站内项目',
      summary: project.description,
      highlights: [],
      route: `/`,
    }))
}

/**
 * 渲染站内简历页，作为首页简历按钮的默认打开目标。
 */
export default async function ResumePage() {
  const siteConfig = await getSiteConfig()
  const personalProjects = buildPersonalResumeProjects(await getProjects())
  const experiences = RESUME_EXPERIENCES as unknown as ResumeExperience[]
  const projects = RESUME_PROJECTS as unknown as ResumeProject[]
  const educations = RESUME_EDUCATIONS as unknown as ResumeEducation[]
  const skillGroups = RESUME_SKILL_GROUPS.map((group) => [...group])

  return (
    <ResumePageClient
      siteProfile={siteConfig.siteProfile}
      experiences={experiences}
      projects={projects}
      personalProjects={personalProjects}
      educations={educations}
      skillGroups={skillGroups}
    />
  )
}
