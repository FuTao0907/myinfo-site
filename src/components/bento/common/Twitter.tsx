'use client'

import React from 'react'
import { useSiteConfig } from '@/components/providers/SiteConfigProvider'
import { useToast } from '@/components/providers/ToastProvider'
import { openExternalLink } from '@/lib/helpers/external-link'
import BentoCenterStage from '../wrapper/BentoCenterStage'

const Twitter: React.FC = () => {
  const { siteProfile } = useSiteConfig()
  const { showToast } = useToast()

  /**
   * 打开社交链接，缺失时显示提示。
   */
  const handleTwitterClick = () => {
    if (!openExternalLink(siteProfile.twitterUrl)) {
      showToast('社交链接暂未配置')
    }
  }

  return (
    <BentoCenterStage className="!bg-transparent" style={{ boxShadow: 'unset' }}>
      <svg
        className="pointer-events-none absolute left-0 top-0 h-full w-full text-[#98CFFF] dark:text-[var(--card--bg)]"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.1,-46.3C90.4,-33.5,96,-16.7,95.5,0C95,-16.8,88.4,-33.6,79.1,-46.4C69.8,-59.2,57.8,-68,43.4,-75.3C29,-82.6,12.2,-88.4,-2.8,-83.9C-17.8,-79.4,-30.6,-64.6,-43.3,-53.4C-56,-42.2,-68.7,-34.6,-77.6,-23.4C-86.5,-12.2,-91.6,2.6,-88.9,16.5C-86.2,30.4,-75.7,43.4,-64.1,53.8C-52.5,64.2,-39.8,71.6,-26.1,77.5C-12.4,83.4,2.3,87.8,17.4,86.2C32.5,84.6,48,78.6,60.8,69.1C73.6,59.6,83.7,46.6,89.5,31.7C95.3,16.8,96.8,0,94,-16.4C91.2,-32.8,84.1,-48.8,73.1,-61.2C62.1,-73.6,47.2,-82.4,32.1,-84C17,-85.6,1.7,-80,-11.9,-72.7L44.7,-76.4Z"
          transform="translate(100 100)"
        />
      </svg>
      <div
        className="pointer-events-auto relative z-10 cursor-pointer !select-none hover:animate-[shake_1.5s_ease-in-out_infinite]"
        onClick={handleTwitterClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 32 32"
          className="text-white dark:text-[#98CFFF] transition-transform duration-300 ease-in-out hover:scale-110"
        >
          <path
            fill="currentColor"
            d="M31.937 6.093c-1.177.516-2.443.871-3.765 1.032a6.405 6.405 0 0 0 2.885-3.625a12.827 12.827 0 0 1-4.063 1.552a6.402 6.402 0 0 0-10.9 5.833A18.158 18.158 0 0 1 2.912 4.197a6.398 6.398 0 0 0 1.98 8.536a6.36 6.36 0 0 1-2.896-.8v.08A6.404 6.404 0 0 0 7.13 18.286a6.435 6.435 0 0 1-2.885.11a6.41 6.41 0 0 0 5.98 4.446a12.848 12.848 0 0 1-7.948 2.74A12.7 12.7 0 0 1 0 25.454a18.106 18.106 0 0 0 9.812 2.875c11.776 0 18.213-9.755 18.213-18.213c0-.276-.005-.552-.016-.823a13.013 13.013 0 0 0 3.193-3.313Z"
          />
        </svg>
      </div>
    </BentoCenterStage>
  )
}

export default Twitter
