'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Typed from 'typed.js'

import { useSiteConfig } from '~/shared/components/providers/SiteConfigProvider'
import { useToast } from '~/shared/components/providers/ToastProvider'
import { HOME_ASSETS } from '~/shared/lib/constants/content'
import { openExternalLink } from '~/shared/lib/utils/external-link'
import {
  FileText,
  Github,
  ICON_SIZE_SM,
  ICON_STROKE_WIDTH,
  Mail,
  RefreshCw,
} from '~/shared/components/ui/icons'
import BentoActionButton from '../wrapper/BentoActionButton'
import BentoActionGroup from '../wrapper/BentoActionGroup'
import BentoAvatarShowcase from '../wrapper/BentoAvatarShowcase'
import BentoContentStack from '../wrapper/BentoContentStack'
import BentoToggleButton from '../wrapper/BentoToggleButton'
import { ShadowCard } from '../wrapper/ShadowCard'

const Profile: React.FC = () => {
  const router = useRouter()
  const { siteProfile } = useSiteConfig()
  const { showToast } = useToast()
  const typedSpanRef = useRef<HTMLSpanElement>(null)
  const [currentAvatar, setCurrentAvatar] = useState<'Arvin' | 'Other'>('Arvin')
  const [isExpandingBg, setIsExpandingBg] = useState(false)
  const [isExpandingAvatar, setIsExpandingAvatar] = useState(false)
  const [typedInstance, setTypedInstance] = useState<Typed | null>(null)

  useEffect(() => {
    if (typedSpanRef.current) {
      const typed = new Typed(typedSpanRef.current, {
        strings: [siteProfile.profileContent],
        typeSpeed: 50,
        showCursor: true,
        onComplete: (self) => {
          if (self.cursor) {
            self.cursor.style.opacity = '0'
          }
        },
      })
      setTypedInstance(typed)
      return () => {
        typed.destroy()
      }
    }
  }, [siteProfile.profileContent])

  /**
   * 切换首页头像展示状态，并重置打字机内容以匹配当前展示。
   */
  const handleSwitch = () => {
    setIsExpandingAvatar(true)
    setTimeout(() => {
      setCurrentAvatar((prev) => (prev === 'Arvin' ? 'Other' : 'Arvin'))
      setIsExpandingBg(true)
      setTimeout(() => setIsExpandingBg(false), 1000)
    }, 500)

    setTimeout(() => setIsExpandingAvatar(false), 1000)

    if (typedInstance) {
      typedInstance.reset()
    }
  }

  /**
   * 将站点配置中的邮箱值转换成可打开邮件客户端的 mailto 链接。
   */
  const buildMailtoLink = (email?: string) => {
    if (!email) {
      return undefined
    }

    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      return undefined
    }

    if (trimmedEmail.startsWith('mailto:')) {
      return trimmedEmail
    }

    const defaultSubject = encodeURIComponent(`来自 ${siteProfile.siteTitle} 的联系`)
    const defaultBody = encodeURIComponent(
      `你好：\n\n我通过你的网站联系你。\n\n我想咨询：\n1. \n2. \n\n`
    )

    return `mailto:${trimmedEmail}?subject=${defaultSubject}&body=${defaultBody}`
  }

  /**
   * 解析简历按钮实际要打开的目标，未配置时回退到站内简历页。
   */
  const resolveCvLink = (cvUrl?: string) => {
    const trimmedUrl = cvUrl?.trim()

    if (!trimmedUrl) {
      return '/resume'
    }

    return trimmedUrl
  }

  /**
   * 处理简历按钮点击，站内路由走客户端跳转，外链继续走统一打开逻辑。
   */
  const handleCvClick = () => {
    const targetUrl = resolveCvLink(siteProfile.cvUrl)

    if (targetUrl.startsWith('/')) {
      router.push(targetUrl)
      return
    }

    handleProfileLinkClick(targetUrl, '简历链接暂未配置')
  }

  /**
   * 打开个人信息区外链，缺失时给出提示而不是硬跳转。
   */
  const handleProfileLinkClick = (url: string | undefined, fallbackMessage = '链接暂未配置') => {
    if (!openExternalLink(url)) {
      showToast(fallbackMessage)
    }
  }

  return (
    <ShadowCard className="justify-between !p-[5px]">
      <style>{`
        .profile-typed-copy .typed-cursor {
          display: inline-block;
          margin-left: 2px;
          line-height: 1;
          vertical-align: baseline;
          transform: translateY(-1px);
        }
      `}</style>
      <div className="flex h-full min-h-0 flex-col">
        <BentoContentStack className="pointer-events-none relative min-h-0 flex-1 items-start justify-start p-6">
          <BentoAvatarShowcase
            src={siteProfile.avatarUrl || siteProfile.iconUrl || HOME_ASSETS.profileAvatar}
            alt="logo"
            isExpandingAvatar={isExpandingAvatar}
            isExpandingBg={isExpandingBg}
            onError={(event) => {
              event.currentTarget.src = HOME_ASSETS.profileAvatarFallbackEmoji
            }}
          />

          <p className="profile-typed-copy text-[20px] leading-8 text-[var(--text-color)]">
            <span ref={typedSpanRef} className="inline align-baseline font-[cursive]" />
          </p>

          <BentoToggleButton
            aria-label="切换头像展示"
            title="切换头像展示"
            label="Toggle"
            icon={<RefreshCw className={ICON_SIZE_SM} strokeWidth={ICON_STROKE_WIDTH} />}
            iconClassName={currentAvatar === 'Arvin' ? 'icon_rotate_one' : 'icon_rotate_two'}
            onClick={handleSwitch}
          />
        </BentoContentStack>

        <BentoActionGroup className="mb-0 shrink-0 px-6 pb-4 pt-2">
          <BentoActionButton
            title="简历"
            aria-label="打开简历"
            className="text-[#1F80FF]"
            onClick={handleCvClick}
          >
            <FileText className={ICON_SIZE_SM} strokeWidth={ICON_STROKE_WIDTH} />
          </BentoActionButton>
          <BentoActionButton
            title="掘金主页"
            aria-label="打开掘金主页"
            className="text-[#1F80FF]"
            onClick={() => handleProfileLinkClick(siteProfile.juejinUrl, '掘金链接暂未配置')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="m12 14.316l7.454-5.88l-2.022-1.625L12 11.1l-.004.003l-5.432-4.288l-2.02 1.624l7.452 5.88Zm0-7.247l2.89-2.298L12 2.453l-.004-.005l-2.884 2.318l2.884 2.3Zm0 11.266l-.005.002l-9.975-7.87L0 12.088l.194.156l11.803 9.308l7.463-5.885L24 12.085l-2.023-1.624Z"
              />
            </svg>
          </BentoActionButton>
          <BentoActionButton
            title="GitHub"
            aria-label="打开 GitHub"
            onClick={() => handleProfileLinkClick(siteProfile.githubHome, 'GitHub 链接暂未配置')}
          >
            <Github className={ICON_SIZE_SM} strokeWidth={ICON_STROKE_WIDTH} />
          </BentoActionButton>
          <BentoActionButton
            title="Email"
            aria-label="发送邮件"
            onClick={() =>
              handleProfileLinkClick(buildMailtoLink(siteProfile.email), '邮箱链接暂未配置')
            }
          >
            <Mail className={ICON_SIZE_SM} strokeWidth={ICON_STROKE_WIDTH} />
          </BentoActionButton>
        </BentoActionGroup>
      </div>
    </ShadowCard>
  )
}

export default Profile
