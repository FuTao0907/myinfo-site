'use client'

import React, { useState, useEffect } from 'react'
import GridLayout, { Layout } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { useSiteConfig } from '@/components/providers/SiteConfigProvider'

// Components
import Profile from './common/Profile'
import Weekly from './common/Weekly'
import AMapView from './common/AMapView'
import Dark from './common/Dark'
import CountDown from './common/CountDown'
import Twitter from './common/Twitter'
import PlaneView from './common/PlaneView'
import Notion from './common/Notion'
import PageTransition from './common/PageTransition'
import StrokeText from './custom/StrokeText'
import SearchShortcutHint from './custom/SearchShortcutHint'
import Sticker8 from './custom/Sticker8'
import Cover from './custom/Cover'

const DEFAULT_SEARCH_HINT_CARD = {
  id: 'SearchShortcutHint',
  x: 2,
  y: 2,
  w: 1,
  h: 1,
  index: 999,
}

const componentMap: Record<string, React.FC> = {
  Profile,
  Weekly,
  Mapbox: AMapView, // 兼容配置中的名称映射
  Dark,
  CountDown,
  Twitter,
  PlaneView,
  Notion,
  PageTransition,
  StrokeText,
  SearchShortcutHint,
  Sticker8,
  Cover,
}

const BentoLayout: React.FC = () => {
  const { homeCards } = useSiteConfig()
  const [layout, setLayout] = useState<Layout[]>([])
  const [cols, setCols] = useState(6)
  const [rowHeight, setRowHeight] = useState(180)
  const [layoutWidth, setLayoutWidth] = useState(1130)
  const [isMobile, setIsMobile] = useState(false)
  const gap = 10

  useEffect(() => {
    const handleResize = () => {
      const width = document.body.clientWidth
      const mobile = /iPhone|iPod|Android|Mobile/i.test(navigator.userAgent) || width <= 768
      setIsMobile(mobile)

      if (width <= 768) {
        setCols(2)
        const size = (width - 50) / 2
        setRowHeight(size)
        setLayoutWidth(width - 50 + gap)
      } else {
        let maxCols = 6
        if (Math.ceil(width / 190) <= 6) {
          maxCols = Math.floor(width / 190)
        }
        setCols(maxCols)
        setRowHeight(180)
        setLayoutWidth(maxCols * 180 + (maxCols > 0 ? (maxCols - 1) * gap : 0))
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const enabledCards = homeCards.filter((item) => item.isEnabled)
    const hasSearchHintCard = enabledCards.some((item) => item.componentId === DEFAULT_SEARCH_HINT_CARD.id)
    const cardsWithSearchHint = hasSearchHintCard
      ? enabledCards
      : [
          ...enabledCards,
          {
            category: 'custom' as const,
            componentId: DEFAULT_SEARCH_HINT_CARD.id,
            x: DEFAULT_SEARCH_HINT_CARD.x,
            y: DEFAULT_SEARCH_HINT_CARD.y,
            w: DEFAULT_SEARCH_HINT_CARD.w,
            h: DEFAULT_SEARCH_HINT_CARD.h,
            index: DEFAULT_SEARCH_HINT_CARD.index,
            isEnabled: true,
          },
        ]

    const allCfg = cardsWithSearchHint
      .filter((item) => item.isEnabled)
      .map((item) => ({
        id: item.componentId,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        index: item.index,
      }))
    // 根据 index 排序以保证顺序正确
    allCfg.sort((a, b) => a.index - b.index)

    const initialLayout: Layout[] = allCfg.map((cfg) => ({
      i: cfg.id,
      x: cols === 2 ? 0 : cfg.x,
      y: cols === 2 ? Infinity : cfg.y,
      w: cols === 2 ? Math.min(cfg.w, 2) : cfg.w,
      h: cfg.h,
    }))
    setLayout(initialLayout)
  }, [cols, homeCards])

  return (
    <div className="flex justify-center w-full">
      <div style={{ width: layoutWidth }}>
        <GridLayout
          className="layout"
          layout={layout}
          cols={cols}
          rowHeight={rowHeight}
          width={layoutWidth}
          margin={[gap, gap]}
          containerPadding={[0, 0]}
          isDraggable={!isMobile}
          isResizable={false}
          draggableCancel=".draggable-cancel, a, button, input, textarea, svg"
          useCSSTransforms={true}
          compactType="vertical"
          preventCollision={false}
          onLayoutChange={(newLayout) => setLayout(newLayout)}
        >
          {layout.map((l) => {
            const Component = componentMap[l.i]
            return (
              <div key={l.i} className="w-full h-full">
                {Component ? <Component /> : <div className="p-4">{l.i}</div>}
              </div>
            )
          })}
        </GridLayout>
      </div>
    </div>
  )
}

export default BentoLayout
