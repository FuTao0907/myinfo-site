'use client'

import { ShadowCard } from '../wrapper/ShadowCard'

/**
 * 渲染首页搜索快捷键提示卡片，并提供点击打开搜索弹层的入口。
 */
export default function SearchShortcutHint() {
  return (
    <ShadowCard className="!p-[5px]">
      <div className="flex h-full flex-col justify-between rounded-[5px] p-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Search</p>
          <h3 className="text-lg font-semibold text-[var(--text-color)]">快捷搜索</h3>
          <p className="text-sm leading-6 text-neutral-500">
            按 <span className="rounded-md border px-1.5 py-0.5 text-xs">Ctrl + K</span> 打开搜索
          </p>
        </div>

       
      </div>
    </ShadowCard>
  )
}
