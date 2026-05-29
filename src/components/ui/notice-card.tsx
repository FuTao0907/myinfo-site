import type { ReactNode } from 'react'

import { cn } from '@/lib/helpers/cn'

interface NoticeCardProps {
  eyebrow?: string
  title: string
  description: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

/**
 * 提供强调型提示卡片，适合下一步引导、注意事项和更新说明等场景。
 */
export default function NoticeCard({
  eyebrow,
  title,
  description,
  icon,
  action,
  className,
}: NoticeCardProps) {
  return (
    <div
      className={cn(
        'rounded-[24px] border border-[color-mix(in_srgb,var(--ui-main-border)_76%,transparent)] bg-[color-mix(in_srgb,var(--ui-main-bg)_94%,transparent)] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:p-7',
        className
      )}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          {eyebrow || icon ? (
            <div className="flex items-center gap-2">
              {icon ? <span className="text-[var(--ui-main-text)]/58">{icon}</span> : null}
              {eyebrow ? (
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--ui-main-text)]/45">
                  {eyebrow}
                </p>
              ) : null}
            </div>
          ) : null}
          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--ui-main-text)]">
            {title}
          </h3>
          <p className="max-w-2xl text-sm leading-6 text-[var(--ui-main-text)]/66">{description}</p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  )
}
