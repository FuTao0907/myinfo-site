import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { HOME_ASSETS } from '@/lib/constants/content/index'
import BentoActionButton from '../wrapper/BentoActionButton'
import BentoCornerAction from '../wrapper/BentoCornerAction'
import BentoMediaSurface from '../wrapper/BentoMediaSurface'

const Weekly: React.FC = () => {
  return (
    <BentoMediaSurface className="group select-none">
      <img
        className="pointer-events-none h-full w-full select-none object-fill dark:opacity-0 opacity-100 transition-opacity"
        src={HOME_ASSETS.weeklyBackground}
        alt=""
      />
      <img
        className="pointer-events-none absolute left-0 top-0 h-auto w-[370px] select-none object-fill"
        src={HOME_ASSETS.weeklyIllustration}
        style={{ transform: 'rotate(330deg) translate3d(100px, 10px, 10px)' }}
        alt=""
      />

      <BentoCornerAction position="bottom-left">
        <BentoActionButton href="/daily" aria-label="打开日常页面">
          <ArrowUpRight className="w-4 h-4" />
        </BentoActionButton>
      </BentoCornerAction>
    </BentoMediaSurface>
  )
}

export default Weekly
