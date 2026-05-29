import Link from 'next/link'

import { HOME_PROFILE_CONFIG } from '@/lib/constants/content/index'
import SiteNavigation from '@/components/layouts/SiteNavigation'
import ThemeToggle from '@/components/ui/ThemeToggle'

/**
 * 娓叉煋绔欑偣椤堕儴瀵艰埅鏍忋€? */
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
