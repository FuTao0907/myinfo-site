'use client'

import { ArrowUpRight, ExternalLink, Github, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { ShadowCard } from '@/components/bento/wrapper/ShadowCard'
import { useToast } from '@/components/providers/ToastProvider'
import { lockBodyScroll, unlockBodyScroll } from '@/lib/helpers/body-scroll-lock'
import { openExternalLink } from '@/lib/helpers/external-link'
import type { ProjectItem } from '@/types/site-config'

interface ProjectsClientProps {
  projects: ProjectItem[]
}

/**
 * 渲染项目列表和详情弹层。
 */
export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const { showToast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState<ProjectItem | null>(null)
  const visibleProjects = projects.filter((project) => project.status === 'published')

  useEffect(() => {
    if (!isOpen) {
      return
    }

    lockBodyScroll()

    return () => {
      unlockBodyScroll()
    }
  }, [isOpen])

  const openModal = (project: ProjectItem) => {
    setCurrentProject(project)
    setIsOpen(true)
  }

  /**
   * 打开项目链接，缺失时显示对应提示。
   */
  const handleProjectLinkClick = (url: string | undefined, emptyMessage: string) => {
    if (!openExternalLink(url)) {
      showToast(emptyMessage)
    }
  }

  return (
    <div>
      <div className="mx-auto grid max-w-[970px] grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-[10px] rounded-xl px-[5px] text-start md:px-[25px]">
        {visibleProjects.map((project) => (
          <ShadowCard
            key={project.id}
            className="group relative flex flex-col justify-center overflow-hidden rounded-[12px] border-[var(--blog-card-border)] border-solid bg-[var(--blog-card-bg)] object-cover text-[var(--blog-card-text)] shadow-md !p-[0px] hover:opacity-100"
          >
            <div onClick={() => openModal(project)}>
              <div className="image min-h-[200px] w-full select-none px-[10px] py-[20px] transition-transform duration-500 group-hover:scale-110">
                <img
                  src={project.coverUrl ?? ''}
                  alt={project.name}
                  className="pointer-events-none block h-full min-h-[213px] min-w-[270px] w-full rounded-[6px] object-cover"
                  onError={(event) => {
                    event.currentTarget.src =
                      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop'
                  }}
                />
              </div>

              <div className="pointer-events-auto absolute bottom-0 left-0 z-[10] flex w-full items-center justify-between p-[10px] text-[16px] leading-7 text-[var(--project-card-text)]">
                <button
                  type="button"
                  className="inline-flex gap-[0.5] pr-[0.5] text-[0.95em] leading-none hover:underline"
                  onClick={(event) => {
                    event.stopPropagation()
                    handleProjectLinkClick(project.demoUrl, '项目演示地址暂未配置')
                  }}
                >
                  {project.name}
                  <ArrowUpRight className="ml-1 inline-block h-[0.95em] w-[0.95em] translate-y-0.5" />
                </button>
              </div>

              <div
                className="pointer-events-none absolute bottom-[-150px] z-0 h-[200px] w-full transition-opacity duration-200"
                style={{
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9), 50%, rgba(0, 0, 0, 0))',
                }}
              />
            </div>
          </ShadowCard>
        ))}
      </div>

      {isOpen && currentProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 transition-opacity">
          <div className="relative w-full max-w-lg overflow-hidden rounded-[12px] border-[5px] border-[var(--card-border)] bg-[var(--ui-main-bg)] p-4 text-[var(--ui-main-text)] shadow-2xl md:p-[1.5em]">
            <div className="mb-4 flex flex-row items-center justify-between">
              <h2 className="text-[1.25rem] font-bold">{currentProject.name}</h2>
              <button
                type="button"
                className="cursor-pointer border-0 bg-transparent hover:opacity-50"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <img
              src={currentProject.coverUrl ?? ''}
              alt={currentProject.name}
              className="pointer-events-none mb-4 block h-auto max-h-[300px] w-full rounded-[6px] object-cover"
            />

            <div className="mt-6 flex flex-row items-center justify-between gap-[20px]">
              <div className="flex-1 truncate rounded-md bg-[var(--card--bg)] px-4 py-2 text-sm">
                {currentProject.description}
              </div>
              <div className="flex flex-shrink-0 flex-row gap-4">
                <button
                  type="button"
                  aria-label="打开项目仓库"
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-[6px] bg-[var(--card--bg)] transition-opacity hover:opacity-80"
                  onClick={() =>
                    handleProjectLinkClick(currentProject.repoUrl, '项目仓库地址暂未配置')
                  }
                >
                  <Github className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="打开项目演示"
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-[6px] bg-[var(--card--bg)] transition-opacity hover:opacity-80"
                  onClick={() =>
                    handleProjectLinkClick(currentProject.demoUrl, '项目演示地址暂未配置')
                  }
                >
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
