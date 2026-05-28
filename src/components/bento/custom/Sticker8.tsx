'use client'

import React from 'react'

const Sticker8: React.FC = () => {
  return (
    <div className="sticker-container relative h-full w-full bg-white p-[6px] text-[var(--cover-main-color)] dark:bg-[#30363d] rounded-[10px] overflow-hidden">
      <div className="box pointer-events-none h-full w-full flex flex-col items-center justify-center rounded-[8px] bg-[var(--cover-main-color)] text-center font-bold font-[fantasy]">
        {/* 椭圆 */}
        <div className="grid w-full flex-1 flex-shrink-0 place-items-center px-[20px]">
          <div className="h-[60px] w-full rounded-[30px] bg-white text-[36px] leading-[60px] dark:bg-[#30363d]">
            Ango
          </div>
        </div>
        {/* 描述 */}
        <div className="h-1/4 max-h-[42px] flex items-center justify-center w-full flex-shrink-0 border-4 border-[var(--cover-main-color)] rounded-[10px] border-solid bg-white p-[2px] dark:bg-[#30363d]">
          PhiLia093.lik
        </div>
      </div>
    </div>
  )
}

export default Sticker8
