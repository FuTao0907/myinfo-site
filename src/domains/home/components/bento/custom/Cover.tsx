'use client'

import React from 'react'

import BentoDecorativeLayout from '../wrapper/BentoDecorativeLayout'
import BentoDisplayText from '../wrapper/BentoDisplayText'
import BentoMediaSurface from '../wrapper/BentoMediaSurface'

const Cover: React.FC = () => {
  return (
    <BentoMediaSurface className="cover-container bg-[var(--cover-main-color)]">
      <BentoDecorativeLayout className="inner-container absolute left-1/2 top-1/2 !h-[90%] !w-[90%] -translate-x-[-50%] -translate-y-[-50%] rounded-[6px] border-[2px] border-solid border-[#457AF7] bg-[var(--cover-main-color)] px-4 py-8 text-left dark:border-[#474d63]">
        <span className="pointer-events-none absolute inset-0 m-[10px] select-none border-2 border-[#457AF7] border-dashed opacity-100 dark:border-[#474d63]">
          <span className="absolute h-1.5 w-1.5 border border-[#457AF7] bg-[#457AF7] -left-0.5 -top-0.5" />
          <span className="absolute h-1.5 w-1.5 border border-[#457AF7] bg-[#457AF7] -right-0.5 -top-0.5" />
          <span className="absolute h-1.5 w-1.5 border border-[#457AF7] bg-[#457AF7] -bottom-0.5 -left-0.5" />
          <span className="absolute h-1.5 w-1.5 select-none border border-[#457AF7] bg-[#457AF7] -bottom-0.5 -right-0.5" />
        </span>

        <BentoDisplayText className="text-[36px] text-[#c29048]">My default cover</BentoDisplayText>

        <BentoDisplayText className="text-[24px] tracking-widest text-[#ffffff]">
          {`< Ango  /> `}
        </BentoDisplayText>
      </BentoDecorativeLayout>

      <div className="mask-1" />
      <div className="linear-1" />
      <div className="linear-2" />
    </BentoMediaSurface>
  )
}

export default Cover

