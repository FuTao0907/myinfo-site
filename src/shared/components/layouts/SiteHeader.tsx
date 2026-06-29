import Link from 'next/link'

import { HOME_PROFILE_CONFIG } from '~/shared/lib/constants/content'
import ThemeToggle from '~/shared/components/ui/ThemeToggle'
import SiteNavigation from '~/shared/components/layouts/SiteNavigation'

/**
 * 渲染站点顶部导航栏。
 */
export default function SiteHeader() {
  return (
    <header
      id="nav-bg"
      className="sticky top-0 z-[50] flex h-[var(--site-header-height)] w-full items-center justify-between px-[3.5vw] py-[18px]"
    >
      <Link href="/" className="font-bold text-xl">
        {/* <img
          className="block h-[40px] w-[40px] md:h-[56px] md:w-[56px]"
          src="/logo.svg"
          alt="Arvin logo"
        /> */}
        <span className="hidden md:inline-block">{HOME_PROFILE_CONFIG.title}</span>
      </Link>

      <SiteNavigation />
      <ThemeToggle />
    </header>
  )
}
