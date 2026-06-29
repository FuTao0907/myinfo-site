'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { HOME_ASSETS, RESUME_ASSETS, RESUME_PROFILE_CONFIG } from '~/shared/lib/constants/content'
import { lockBodyScroll, unlockBodyScroll } from '~/shared/lib/utils/body-scroll-lock'
import { openExternalLink } from '~/shared/lib/utils/external-link'
import type { SiteProfile } from '~/shared/types/site-config'
import {
  Briefcase,
  Home,
  ICON_SIZE_SM,
  ICON_SIZE_XS,
  ICON_STROKE_WIDTH,
  Link2,
  Mail,
  Phone,
  Search,
  X,
} from '~/shared/components/ui/icons'
import EmptyState from '~/shared/components/ui/empty-state'
import IconActionButton from '~/shared/components/ui/icon-action-button'
import MetaList, { type MetaListItem } from '~/shared/components/ui/meta-list'
import SectionBlock from '~/shared/components/ui/section-block'
import SurfaceCard from '~/shared/components/ui/surface-card'
import TagChip from '~/shared/components/ui/tag-chip'

export interface ResumeExperience {
  title: string
  organization: string
  duration: string
  summary: string
  highlights: string[]
  badge?: string
}

export interface ResumeProject {
  name: string
  role: string
  duration: string
  summary: string
  highlights: string[]
  route?: string
}

export interface ResumeEducation {
  school: string
  major: string
  duration: string
}

interface ResumePageClientProps {
  siteProfile: SiteProfile
  experiences: ResumeExperience[]
  projects: ResumeProject[]
  personalProjects: ResumeProject[]
  educations: ResumeEducation[]
  skillGroups: string[][]
}

interface ResumeCommandItem {
  id: string
  group: string
  label: string
  keywords: string[]
  action: () => void
}

/**
 * 将邮箱值转换成可直接唤起邮件客户端的链接。
 */
function buildResumeMailtoLink(email?: string) {
  const trimmedEmail = email?.trim()

  if (!trimmedEmail) {
    return undefined
  }

  if (trimmedEmail.startsWith('mailto:')) {
    return trimmedEmail
  }

  return `mailto:${trimmedEmail}`
}

/**
 * 从邮箱链接中提取纯邮箱文本，便于展示在页面上。
 */
function getReadableEmail(email?: string) {
  const trimmedEmail = email?.trim()

  if (!trimmedEmail) {
    return '暂未配置'
  }

  return trimmedEmail.replace(/^mailto:/, '').split('?')[0]
}

/**
 * 根据姓名生成头像占位卡片展示文本。
 */
function getResumePortraitFallbackLabel(name: string) {
  const trimmedName = name.trim()

  if (!trimmedName) {
    return 'Resume'
  }

  return trimmedName.length <= 4 ? trimmedName : trimmedName.slice(0, 4)
}

/**
 * 渲染简历页主体与命令面板交互。
 */
export default function ResumePageClient({
  siteProfile,
  experiences,
  projects,
  personalProjects,
  educations,
  skillGroups,
}: ResumePageClientProps) {
  const router = useRouter()
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [isResumePortraitAvailable, setIsResumePortraitAvailable] = useState(
    Boolean(RESUME_ASSETS.portrait)
  )
  const resumeName = RESUME_PROFILE_CONFIG.name
  const resumeSummary = RESUME_PROFILE_CONFIG.summary
  const resumePortrait = RESUME_ASSETS.portrait || HOME_ASSETS.profileAvatar
  const resumePortraitFallbackLabel = getResumePortraitFallbackLabel(resumeName)
  const mailtoLink = buildResumeMailtoLink(siteProfile.email)
  const readableEmail = getReadableEmail(siteProfile.email)
  const resumeMetaItems = useMemo<MetaListItem[]>(
    () => [
      {
        id: 'status',
        label: '当前状态',
        value: RESUME_PROFILE_CONFIG.status,
        icon: <Briefcase className={ICON_SIZE_XS} strokeWidth={ICON_STROKE_WIDTH} />,
      },
      {
        id: 'phone',
        label: '联系电话',
        value: RESUME_PROFILE_CONFIG.phone,
        icon: <Phone className={ICON_SIZE_XS} strokeWidth={ICON_STROKE_WIDTH} />,
      },
      {
        id: 'email',
        label: '邮箱地址',
        value: readableEmail,
        icon: <Mail className={ICON_SIZE_XS} strokeWidth={ICON_STROKE_WIDTH} />,
      },
      {
        id: 'website',
        label: '个人网站',
        value: RESUME_PROFILE_CONFIG.websiteUrl,
        icon: <Link2 className={ICON_SIZE_XS} strokeWidth={ICON_STROKE_WIDTH} />,
        truncate: true,
      },
    ],
    [readableEmail]
  )

  /**
   * 关闭命令面板并重置内部状态。
   */
  const closeCommandMenu = useCallback(() => {
    setIsCommandOpen(false)
    setKeyword('')
    setActiveIndex(0)
  }, [])

  /**
   * 执行命令项操作，并在执行前关闭命令面板。
   */
  const runCommand = useCallback(
    (command: ResumeCommandItem) => {
      closeCommandMenu()
      command.action()
    },
    [closeCommandMenu]
  )

  /**
   * 等待命令面板完成关闭后再触发浏览器打印，避免将覆盖层一起打印出来。
   */
  const printResume = useCallback(() => {
    closeCommandMenu()

    window.setTimeout(() => {
      window.print()
    }, 120)
  }, [closeCommandMenu])

  const commandItems = useMemo<ResumeCommandItem[]>(
    () => [
      {
        id: 'print',
        group: '操作',
        label: '打印简历',
        keywords: ['print', 'pdf', '导出', '打印'],
        action: printResume,
      },
      {
        id: 'home',
        group: '操作',
        label: '返回首页',
        keywords: ['home', 'index', '首页'],
        action: () => router.push('/'),
      },
      {
        id: 'mail',
        group: '链接',
        label: '发送邮件',
        keywords: ['mail', 'email', '邮箱', '联系'],
        action: () => {
          if (mailtoLink) {
            openExternalLink(mailtoLink)
          }
        },
      },
    ],
    [mailtoLink, printResume, router]
  )

  const filteredCommands = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase()

    if (!normalizedKeyword) {
      return commandItems
    }

    return commandItems.filter((item) => {
      const searchText = [item.label, item.group, ...item.keywords].join(' ').toLowerCase()
      return searchText.includes(normalizedKeyword)
    })
  }, [commandItems, keyword])

  /**
   * 在命令面板打开时锁定页面滚动，避免背景跟随滚动。
   */
  useEffect(() => {
    if (!isCommandOpen) {
      return
    }

    lockBodyScroll()

    return () => {
      unlockBodyScroll()
    }
  }, [isCommandOpen])

  /**
   * 监听 Ctrl+J、Esc、上下键和 Enter，驱动简历页命令面板。
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCommandShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'j'

      if (isCommandShortcut) {
        event.preventDefault()
        setIsCommandOpen(true)
        return
      }

      if (!isCommandOpen) {
        return
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        closeCommandMenu()
        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIndex((previous) =>
          Math.min(previous + 1, Math.max(filteredCommands.length - 1, 0))
        )
        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((previous) => Math.max(previous - 1, 0))
        return
      }

      if (event.key === 'Enter') {
        const selectedCommand = filteredCommands[activeIndex]

        if (!selectedCommand) {
          return
        }

        event.preventDefault()
        runCommand(selectedCommand)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, closeCommandMenu, filteredCommands, isCommandOpen, runCommand])

  /**
   * 当过滤结果变化时，将当前高亮项重置到首项。
   */
  useEffect(() => {
    setActiveIndex(0)
  }, [keyword])

  /**
   * 当头像资源地址变化时，重置头像可用状态，便于重新尝试加载。
   */
  useEffect(() => {
    setIsResumePortraitAvailable(Boolean(resumePortrait))
  }, [resumePortrait])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--bg-main-color)] text-[var(--text-color)] print:min-h-0 print:bg-white print:text-black">
      <div className="pointer-events-none absolute inset-0 print:hidden bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--accent-soft)_16%,transparent),transparent_32%),radial-gradient(circle_at_bottom_left,color-mix(in_srgb,var(--accent-soft-2)_16%,transparent),transparent_36%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pb-24 pt-6 print:min-h-0 print:max-w-none print:px-6 print:pb-6 print:pt-6 md:px-6 md:pb-28 md:pt-12">
        <SurfaceCard className="mx-auto w-full space-y-7 p-5 print:space-y-4 print:rounded-none print:border-none print:bg-transparent print:p-0 print:shadow-none md:p-7">
          <div className="flex flex-col justify-between gap-5 print:grid print:grid-cols-[minmax(0,1fr)_68px] print:items-start print:gap-4 md:flex-row md:items-start">
            <div className="min-w-0 flex-1 space-y-1.5 print:space-y-1">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--text-color)]/42">
                Resume
              </p>
              <h1 className="text-3xl font-semibold tracking-tight print:text-[28px] md:text-4xl">
                {resumeName}
              </h1>
              <p className="max-w-xl text-sm font-mono text-[var(--text-color)]/62 print:text-xs print:text-black/70 md:text-base">
                {RESUME_PROFILE_CONFIG.role}
              </p>
              <p className="max-w-xl text-sm font-mono text-[var(--text-color)]/58 print:text-xs print:text-black/65">
                {RESUME_PROFILE_CONFIG.locationLabel}
              </p>

              <MetaList
                items={resumeMetaItems}
                className="pt-2 text-xs font-mono text-[var(--text-color)]/58 print:space-y-1 print:pt-1 print:text-[11px] print:text-black/70 md:text-sm"
                itemClassName="items-center"
                textClassName="min-w-0"
              />

              <div className="flex flex-wrap gap-2 pt-2 print:hidden">
                <IconActionButton
                  onClick={() => mailtoLink && openExternalLink(mailtoLink)}
                  label="发送邮件"
                  icon={<Mail className={ICON_SIZE_SM} strokeWidth={ICON_STROKE_WIDTH} />}
                  className="h-8 w-8 rounded-md border-[color-mix(in_srgb,var(--ui-main-border)_76%,transparent)] text-sm hover:bg-[color-mix(in_srgb,var(--ui-second-bg)_72%,var(--text-color)_8%)]"
                />
                <IconActionButton
                  onClick={() => router.push('/')}
                  label="返回首页"
                  icon={<Home className={ICON_SIZE_SM} strokeWidth={ICON_STROKE_WIDTH} />}
                  className="h-8 w-8 rounded-md border-[color-mix(in_srgb,var(--ui-main-border)_76%,transparent)] text-sm hover:bg-[color-mix(in_srgb,var(--ui-second-bg)_72%,var(--text-color)_8%)]"
                />
              </div>
            </div>

            <div className="mx-auto flex h-28 w-28 shrink-0 overflow-hidden rounded-[18px] border border-[color-mix(in_srgb,var(--ui-main-border)_76%,transparent)] bg-[var(--ui-second-bg)] print:mx-0 print:h-[96px] print:w-[68px] print:justify-self-end print:rounded-[10px] print:border print:border-black/10 md:mx-0">
              {isResumePortraitAvailable ? (
                <img
                  src={resumePortrait}
                  alt={resumeName}
                  className="h-full w-full object-cover print:object-top"
                  onError={() => {
                    setIsResumePortraitAvailable(false)
                  }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[color-mix(in_srgb,var(--ui-main-bg)_72%,transparent)] text-center text-lg font-medium text-[var(--ui-main-text)]/88 print:text-xs">
                  {resumePortraitFallbackLabel}
                </div>
              )}
            </div>
          </div>

          <SectionBlock title="个人简介">
            <p className="max-w-3xl text-sm font-mono leading-7 text-[var(--text-color)]/70 print:max-w-none print:text-[11px] print:leading-6 print:text-black/75">
              {resumeSummary}
            </p>
          </SectionBlock>

          <SectionBlock title="工作经历">
            <div className="flex flex-col gap-4 print:gap-3">
              {experiences.map((experience) => (
                <SurfaceCard
                  key={`${experience.organization}-${experience.title}`}
                  subtle
                  className="px-4 py-4 print:[break-inside:avoid] print:rounded-none print:border-none print:bg-transparent print:px-0 print:py-0"
                >
                  <div className="flex flex-col gap-2 print:flex-row print:items-start print:justify-between md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold print:text-sm md:text-lg">
                          {experience.organization}
                        </h3>
                        {experience.badge ? (
                          <TagChip className="rounded-md bg-[var(--ui-second-bg)] px-2 py-0.5 font-mono text-[11px] text-[var(--text-color)]/60 print:rounded-sm print:border-black/10 print:bg-transparent print:px-1.5 print:py-0 print:text-[10px] print:text-black/60">
                            {experience.badge}
                          </TagChip>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm font-mono text-[var(--text-color)]/68 print:text-[11px] print:text-black/70">
                        {experience.title}
                      </p>
                      <p className="mt-2 text-sm font-mono leading-7 text-[var(--text-color)]/64 print:mt-1.5 print:text-[11px] print:leading-6 print:text-black/72">
                        {experience.summary}
                      </p>
                    </div>
                    <div className="shrink-0 text-sm font-mono text-[var(--text-color)]/52 print:pt-0.5 print:text-[10px] print:text-black/55">
                      {experience.duration}
                    </div>
                  </div>

                  <ol className="mt-3 flex list-decimal flex-col gap-1.5 pl-5 text-sm font-mono leading-7 text-[var(--text-color)]/70 print:mt-2 print:gap-1 print:pl-4 print:text-[11px] print:leading-6 print:text-black/72">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ol>
                </SurfaceCard>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock title="专业技能">
            <div className="flex flex-wrap gap-2 print:gap-1.5">
              {skillGroups.flat().map((skill) => (
                <TagChip
                  key={skill}
                  className="rounded-md border-[var(--ui-main-border)] bg-[color-mix(in_srgb,var(--accent-soft)_30%,var(--ui-main-bg)_70%)] font-mono text-[var(--text-color)]/78 print:rounded-sm print:border-black/10 print:bg-transparent print:px-1.5 print:py-0.5 print:text-[10px] print:text-black/70"
                >
                  {skill}
                </TagChip>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock title="项目经历">
            <div className="flex flex-col gap-4 print:gap-2">
              {projects.map((project) => (
                <SurfaceCard
                  key={`${project.name}-${project.duration}`}
                  subtle
                  className="flex h-full flex-col p-3.5 print:block print:rounded-none print:border-none print:bg-transparent print:p-0"
                >
                  <div className="space-y-1">
                    {project.route ? (
                      <Link
                        href={project.route}
                        className="inline-flex cursor-pointer select-none text-base font-semibold transition-opacity hover:opacity-72 print:pointer-events-none print:text-sm"
                      >
                        {project.name}
                      </Link>
                    ) : (
                      <h3 className="text-base font-semibold print:text-sm">{project.name}</h3>
                    )}
                    <p className="text-sm font-mono text-[var(--text-color)]/66 print:text-[11px] print:text-black/70">
                      {project.role}
                    </p>
                    <p className="text-xs font-mono text-[var(--text-color)]/52 print:text-[10px] print:text-black/55">
                      {project.duration}
                    </p>
                    <p className="pt-1 text-sm font-mono leading-6 text-[var(--text-color)]/64 print:text-[11px] print:leading-6 print:text-black/72">
                      {project.summary}
                    </p>
                  </div>

                  {project.highlights.length > 0 ? (
                    <ol className="mt-3 flex list-decimal flex-col gap-1.5 pl-5 text-sm font-mono leading-6 text-[var(--text-color)]/70 print:mt-2 print:gap-1 print:pl-4 print:text-[11px] print:leading-6 print:text-black/72">
                      {project.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ol>
                  ) : null}
                </SurfaceCard>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock title="教育经历">
            <div className="flex flex-col gap-3 print:gap-2">
              {educations.map((education) => (
                <SurfaceCard
                  key={`${education.school}-${education.duration}`}
                  subtle
                  className="rounded-[16px] px-4 py-3 print:[break-inside:avoid] print:rounded-none print:border-none print:bg-transparent print:px-0 print:py-0"
                >
                  <div className="flex flex-col gap-2 print:flex-row print:items-start print:justify-between md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold print:text-sm md:text-base">
                        {education.school}
                      </h3>
                      <p className="mt-1 text-sm font-mono text-[var(--text-color)]/66 print:text-[11px] print:text-black/70">
                        {education.major}
                      </p>
                    </div>
                    <div className="shrink-0 text-xs font-mono text-[var(--text-color)]/52 print:pt-0.5 print:text-[10px] print:text-black/55 md:text-sm">
                      {education.duration}
                    </div>
                  </div>
                </SurfaceCard>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock
            title="个人项目"
            description="与站内项目数据同源，后续新增项目后会自动同步到这里。"
          >
            <div className="grid grid-cols-1 gap-4 print:gap-2 print:grid-cols-1 md:grid-cols-3">
              {personalProjects.map((project) => (
                <SurfaceCard
                  key={`${project.name}-${project.route ?? project.summary}`}
                  subtle
                  className="flex h-full flex-col p-3.5 print:block print:rounded-none print:border-none print:bg-transparent print:p-0"
                >
                  <div className="space-y-1">
                    {project.route ? (
                      <Link
                        href={project.route}
                        className="inline-flex cursor-pointer select-none text-base font-semibold transition-opacity hover:opacity-72 print:pointer-events-none print:text-sm"
                      >
                        {project.name}
                      </Link>
                    ) : (
                      <h3 className="text-base font-semibold print:text-sm">{project.name}</h3>
                    )}
                    <p className="text-sm font-mono text-[var(--text-color)]/66 print:text-[11px] print:text-black/70">
                      {project.role}
                    </p>
                    <p className="text-xs font-mono text-[var(--text-color)]/52 print:text-[10px] print:text-black/55">
                      {project.duration}
                    </p>
                    <p className="pt-1 text-sm font-mono leading-6 text-[var(--text-color)]/64 print:text-[11px] print:leading-6 print:text-black/72">
                      {project.summary}
                    </p>
                  </div>
                </SurfaceCard>
              ))}
            </div>
          </SectionBlock>
        </SurfaceCard>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-20 flex justify-center px-4 print:hidden">
        <div className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-[var(--ui-main-border)] bg-[color-mix(in_srgb,var(--ui-main-bg)_88%,transparent)] px-4 py-2 text-sm text-[var(--text-color)]/68 shadow-[var(--ui-main-box-shadow)] backdrop-blur-sm">
          <span>按下</span>
          <span className="rounded-md border border-[var(--ui-main-border)] bg-[var(--ui-second-bg)] px-2 py-0.5 text-xs">
            Ctrl + J
          </span>
          <span>打开命令面板</span>
        </div>
      </div>

      {isCommandOpen ? (
        <div
          className="fixed inset-0 z-30 flex items-start justify-center bg-black/35 px-4 pt-[14vh] backdrop-blur-[4px] print:hidden"
          onClick={closeCommandMenu}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-[24px] border border-[var(--ui-main-border)] bg-[color-mix(in_srgb,var(--ui-main-bg)_96%,transparent)] shadow-[var(--ui-main-box-shadow)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[var(--ui-main-border)] px-4 py-4">
              <Search
                className={`${ICON_SIZE_SM} text-[var(--text-color)]/48`}
                strokeWidth={ICON_STROKE_WIDTH}
              />
              <input
                autoFocus
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="输入命令或搜索..."
                className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--text-color)]/42"
              />
              <button
                type="button"
                onClick={closeCommandMenu}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--ui-main-border)] bg-[var(--ui-second-bg)]"
              >
                <X className={ICON_SIZE_SM} strokeWidth={ICON_STROKE_WIDTH} />
              </button>
            </div>

            <div className="max-h-[420px] overflow-y-auto p-3">
              {filteredCommands.length > 0 ? (
                ['操作', '链接'].map((groupName) => {
                  const groupItems = filteredCommands.filter((item) => item.group === groupName)

                  if (groupItems.length === 0) {
                    return null
                  }

                  return (
                    <div key={groupName} className="mb-4 last:mb-0">
                      <p className="px-3 pb-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-color)]/38">
                        {groupName}
                      </p>
                      <div className="flex flex-col gap-1">
                        {groupItems.map((item) => {
                          const visualIndex = filteredCommands.findIndex(
                            (entry) => entry.id === item.id
                          )
                          const isActive = visualIndex === activeIndex

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => runCommand(item)}
                              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition-colors ${
                                isActive
                                  ? 'bg-[color-mix(in_srgb,var(--text-color)_8%,transparent)]'
                                  : 'hover:bg-[color-mix(in_srgb,var(--text-color)_5%,transparent)]'
                              }`}
                            >
                              <span>{item.label}</span>
                              <span className="text-xs text-[var(--text-color)]/35">
                                {item.group}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })
              ) : (
                <EmptyState
                  compact
                  icon={<Search className={ICON_SIZE_SM} strokeWidth={ICON_STROKE_WIDTH} />}
                  title="没有匹配的命令"
                  description="尝试搜索“打印”、“首页”或“邮箱”等关键词。"
                  className="border-none bg-transparent px-4 py-8 shadow-none"
                />
              )}
            </div>
          </div>
        </div>
      ) : null}
      <div className="print:hidden" />
    </div>
  )
}
