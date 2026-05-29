'use client'

import BentoBadge from '../wrapper/BentoBadge'
import BentoInfoBlock from '../wrapper/BentoInfoBlock'
import { ShadowCard } from '../wrapper/ShadowCard'

/**
 * 渲染首页搜索快捷键提示卡片，并提供点击打开搜索弹层的入口。
 */
export default function SearchShortcutHint() {
  return (
    <ShadowCard className="!p-[5px]">
      <div className="flex h-full flex-col justify-between rounded-[5px] p-4">
        <BentoInfoBlock
          eyebrow="Search"
          title="快捷搜索"
          description={
            <>
              按 <BentoBadge>Ctrl + K</BentoBadge> 打开搜索
            </>
          }
        />
      </div>
    </ShadowCard>
  )
}
