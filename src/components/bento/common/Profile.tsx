'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FileText, Github, Mail, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSiteConfig } from '@/components/providers/SiteConfigProvider'
import { useToast } from '@/components/providers/ToastProvider'
import { HOME_ASSETS } from '@/lib/constants/content/index'
import { openExternalLink } from '@/lib/helpers/external-link'
import { ShadowCard } from '../wrapper/ShadowCard'
import Typed from 'typed.js'

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
      <div className="pointer-events-none relative min-h-[calc(100%_-_50px)] p-6">
        <div className="relative mb-[30px] h-[96px] w-[96px]">
          <div
            className={`avatar-img absolute left-0 top-0 z-20 mb-8 h-[96px] w-[96px] rounded-full dark:bg-[var(--header-avatar-bg)] flex items-center justify-center ${isExpandingAvatar ? 'expanding-avatar-circle' : ''}`}
          >
            {currentAvatar === 'Arvin' ? (
              <img
                className="h-full w-full object-cover rounded-full"
                src={siteProfile.avatarUrl || siteProfile.iconUrl || HOME_ASSETS.profileAvatar}
                alt="logo"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = HOME_ASSETS.profileAvatarFallbackEmoji
                }}
              />
            ) : (
              <img
                className="h-full w-full object-cover rounded-full"
                src={siteProfile.avatarUrl || siteProfile.iconUrl || HOME_ASSETS.profileAvatar}
                alt="logo"
              />
            )}
          </div>
          <div className={`avatar-bg ${isExpandingBg ? 'expanding-bg-circle' : ''}`} />
        </div>

        <span ref={typedSpanRef} className="text-[20px] font-[cursive]" />

        <button className="switch-btn pointer-events-auto" onClick={handleSwitch}>
          <div
            className={`icon ${currentAvatar === 'Arvin' ? 'icon_rotate_one' : 'icon_rotate_two'}`}
          >
            <RefreshCw className="h-4 w-4" strokeWidth={1.8} />
          </div>
          <p className="text">Toggle</p>
        </button>
      </div>

      <div className="flex flex-row justify-end gap-4 px-6 mb-4">
        <button
          type="button"
          title="简历"
          className="detail-arrow text-[#1F80FF]"
          onClick={handleCvClick}
        >
          <FileText className="h-4 w-4" strokeWidth={1.8} />
        </button>
        <button
          type="button"
          title="掘金主页"
          className="detail-arrow text-[#1F80FF]"
          onClick={() => handleProfileLinkClick(siteProfile.juejinUrl, '掘金链接暂未配置')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="m12 14.316l7.454-5.88l-2.022-1.625L12 11.1l-.004.003l-5.432-4.288l-2.02 1.624l7.452 5.88Zm0-7.247l2.89-2.298L12 2.453l-.004-.005l-2.884 2.318l2.884 2.3Zm0 11.266l-.005.002l-9.975-7.87L0 12.088l.194.156l11.803 9.308l7.463-5.885L24 12.085l-2.023-1.624Z"
            />
          </svg>
        </button>
        <button
          type="button"
          title="GitHub"
          className="detail-arrow"
          onClick={() => handleProfileLinkClick(siteProfile.githubHome, 'GitHub 链接暂未配置')}
        >
          <Github className="h-4 w-4" strokeWidth={1.8} />
        </button>
        <button
          type="button"
          title="Email"
          className="detail-arrow"
          onClick={() =>
            handleProfileLinkClick(buildMailtoLink(siteProfile.email), '邮箱链接暂未配置')
          }
        >
          <Mail className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>
    </ShadowCard>
  )
}

export default Profile
