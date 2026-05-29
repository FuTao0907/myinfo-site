'use client'

import React from 'react'
import BentoDecorativeLayout from '../wrapper/BentoDecorativeLayout'
import BentoDisplayText from '../wrapper/BentoDisplayText'
import BentoMediaSurface from '../wrapper/BentoMediaSurface'

const Sticker8: React.FC = () => {
  return (
    <BentoMediaSurface className="sticker-container bg-white p-[6px] text-[var(--cover-main-color)] dark:bg-[#30363d]">
      <BentoDecorativeLayout className="box flex flex-col items-center justify-center rounded-[8px] bg-[var(--cover-main-color)]">
        {/* 椭圆 */}
        <div className="grid w-full flex-1 flex-shrink-0 place-items-center px-[20px]">
          <BentoDisplayText className="h-[60px] w-full rounded-[30px] bg-white text-[36px] leading-[60px] dark:bg-[#30363d]">
            Ango
          </BentoDisplayText>
        </div>
        {/* 描述 */}
        <BentoDisplayText className="flex h-1/4 max-h-[42px] w-full flex-shrink-0 items-center justify-center rounded-[10px] border-4 border-[var(--cover-main-color)] border-solid bg-white p-[2px] dark:bg-[#30363d]">
          PhiLia093.lik
        </BentoDisplayText>
      </BentoDecorativeLayout>
    </BentoMediaSurface>
  )
}

export default Sticker8
