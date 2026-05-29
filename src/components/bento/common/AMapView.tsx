'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X } from 'lucide-react'

import { useSiteConfig } from '@/components/providers/SiteConfigProvider'
import { AMAP_SETTINGS } from '@/lib/constants/content/index'
import { lockBodyScroll, unlockBodyScroll } from '@/lib/helpers/body-scroll-lock'

interface ResolvedLocation {
  longitude: number
  latitude: number
  label: string
}

interface AMapInstance {
  add: (overlay: unknown) => void
  destroy: () => void
  setMapStyle?: (style: string) => void
}

interface AMapNamespace {
  Map: new (
    container: HTMLDivElement,
    options: {
      viewMode: '2D'
      zoom: number
      center: [number, number]
      mapStyle: string
      dragEnable: boolean
      zoomEnable: boolean
      doubleClickZoom: boolean
      scrollWheel: boolean
      jogEnable: boolean
      keyboardEnable: boolean
    }
  ) => AMapInstance
  Marker: new (options: {
    position: [number, number]
    content: HTMLDivElement
    offset: unknown
  }) => unknown
  Geocoder: new (options?: { radius?: number; extensions?: 'base' | 'all' }) => {
    getAddress: (
      location: [number, number],
      callback: (
        status: string,
        result: {
          info?: string
          regeocode?: {
            formattedAddress?: string
            addressComponent?: {
              city?: string | string[]
              province?: string
              district?: string
            }
          }
        }
      ) => void
    ) => void
  }
  Pixel: new (x: number, y: number) => unknown
}

interface AMapCanvasProps {
  className: string
  interactive: boolean
  iconUrl?: string
  location: ResolvedLocation
  zoom: number
}

interface AMapPreviewModalProps {
  isOpen: boolean
  location: ResolvedLocation
  onClose: () => void
}

/**
 * 在地图先收到交互后，阻止事件继续冒泡到外层拖拽布局。
 */
function stopDragPropagation(event: React.SyntheticEvent) {
  event.stopPropagation()
}

/**
 * 根据当前主题返回对应的高德地图样式。
 */
function getMapStyle(isDark: boolean) {
  return isDark ? AMAP_SETTINGS.mapDarkStyle : AMAP_SETTINGS.mapLightStyle
}

/**
 * 创建地图上的头像标记节点。
 */
function createMarkerContent(iconUrl?: string) {
  const markerContent = document.createElement('div')
  const image = document.createElement('img')

  image.src = iconUrl || ''
  image.width = 32
  image.height = 32
  image.style.borderRadius = '50%'
  image.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)'

  markerContent.appendChild(image)

  return markerContent
}

/**
 * 将逆地理编码结果整理成简洁的位置文案。
 */
function buildLocationLabel(result: {
  regeocode?: {
    formattedAddress?: string
    addressComponent?: {
      city?: string | string[]
      province?: string
      district?: string
    }
  }
}) {
  const cityValue = result.regeocode?.addressComponent?.city
  const city = Array.isArray(cityValue) ? cityValue[0] : cityValue
  const province = result.regeocode?.addressComponent?.province
  const district = result.regeocode?.addressComponent?.district

  if (city && district) {
    return `${city} ${district}`
  }

  if (city) {
    return city
  }

  if (province && district) {
    return `${province} ${district}`
  }

  if (province) {
    return province
  }

  return result.regeocode?.formattedAddress || '当前位置'
}

/**
 * 调用高德逆地理编码，将坐标转换为可展示的位置文案。
 */
async function reverseGeocode(longitude: number, latitude: number) {
  if (!AMAP_SETTINGS.key || !AMAP_SETTINGS.securityJsCode) {
    return '当前位置'
  }

  window._AMapSecurityConfig = {
    securityJsCode: AMAP_SETTINGS.securityJsCode,
  }

  const { default: AMapLoader } = await import('@amap/amap-jsapi-loader')
  const AMap = (await AMapLoader.load({
    key: AMAP_SETTINGS.key,
    version: '2.0',
    plugins: ['AMap.Geocoder'],
  })) as unknown as AMapNamespace

  return new Promise<string>((resolve) => {
    const geocoder = new AMap.Geocoder({
      radius: 1000,
      extensions: 'base',
    })

    geocoder.getAddress([longitude, latitude], (status, result) => {
      if (status === 'complete' && result.info === 'OK') {
        resolve(buildLocationLabel(result))
        return
      }

      resolve('当前位置')
    })
  })
}

/**
 * 使用浏览器定位获取当前位置，失败时返回空值。
 */
function getBrowserLocation() {
  return new Promise<GeolocationPosition | null>((resolve) => {
    if (!navigator.geolocation) {
      resolve(null)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      () => resolve(null),
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 60_000,
      }
    )
  })
}

/**
 * 初始化高德地图，并根据交互场景控制缩放与拖拽。
 */
function AMapCanvas({ className, interactive, iconUrl, location, zoom }: AMapCanvasProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<AMapInstance | null>(null)

  useEffect(() => {
    let isDestroyed = false
    let themeObserver: MutationObserver | null = null

    /**
     * 在浏览器环境中初始化高德地图实例。
     */
    async function initMap() {
      if (map.current || !mapContainer.current) return
      if (!AMAP_SETTINGS.key || !AMAP_SETTINGS.securityJsCode) return

      window._AMapSecurityConfig = {
        securityJsCode: AMAP_SETTINGS.securityJsCode,
      }

      try {
        const { default: AMapLoader } = await import('@amap/amap-jsapi-loader')
        const AMap = (await AMapLoader.load({
          key: AMAP_SETTINGS.key,
          version: '2.0',
          plugins: ['AMap.Marker'],
        })) as unknown as AMapNamespace

        if (isDestroyed || !mapContainer.current) return

        const mapInstance = new AMap.Map(mapContainer.current, {
          viewMode: '2D',
          zoom,
          center: [location.longitude, location.latitude],
          mapStyle: getMapStyle(document.documentElement.classList.contains('dark')),
          dragEnable: interactive,
          zoomEnable: interactive,
          doubleClickZoom: interactive,
          scrollWheel: interactive,
          jogEnable: interactive,
          keyboardEnable: interactive,
        })

        const marker = new AMap.Marker({
          position: [location.longitude, location.latitude],
          content: createMarkerContent(iconUrl),
          offset: new AMap.Pixel(-16, -16),
        })

        mapInstance.add(marker)
        map.current = mapInstance

        themeObserver = new MutationObserver(() => {
          if (!map.current?.setMapStyle) return
          map.current.setMapStyle(getMapStyle(document.documentElement.classList.contains('dark')))
        })

        themeObserver.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['class'],
        })
      } catch (error) {
        console.error('高德地图加载失败', error)
      }
    }

    initMap()

    return () => {
      isDestroyed = true
      themeObserver?.disconnect()
      if (map.current) {
        map.current.destroy()
        map.current = null
      }
    }
  }, [interactive, iconUrl, location.latitude, location.longitude, zoom])

  return <div ref={mapContainer} className={className} />
}

/**
 * 渲染地图放大预览弹层。
 */
function AMapPreviewModal({ isOpen, location, onClose }: AMapPreviewModalProps) {
  const { siteProfile } = useSiteConfig()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    /**
     * 响应键盘 Esc 快捷键关闭弹层。
     */
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    lockBodyScroll()
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      unlockBodyScroll()
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isMounted || !isOpen) {
    return null
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px]"
      onClick={onClose}
      onMouseDown={stopDragPropagation}
      onPointerDown={stopDragPropagation}
      onTouchStart={stopDragPropagation}
    >
      <div
        className="relative w-full max-w-[860px] overflow-hidden rounded-[16px] border-[5px] border-[var(--card-border)] bg-[var(--ui-main-bg)] p-[10px] text-[var(--ui-main-text)] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        onMouseDown={stopDragPropagation}
        onPointerDown={stopDragPropagation}
        onTouchStart={stopDragPropagation}
      >
        <div className="mb-3 flex items-center justify-between px-1">
          <div>
            <p className="text-sm text-[var(--text-color)]/70">地图预览</p>
            <h2 className="text-lg font-bold text-[var(--ui-main-text)]">{location.label}</h2>
          </div>
          <button
            type="button"
            aria-label="关闭地图预览"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--card--bg)] text-[var(--text-color)] transition-opacity hover:opacity-80"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="h-[calc(60vh_-_60px)] min-h-[320px] w-full overflow-hidden rounded-[12px] bg-[var(--card--bg)]">
          <AMapCanvas
            className="h-full w-full"
            interactive={true}
            iconUrl={siteProfile.iconUrl}
            location={location}
            zoom={10}
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

/**
 * 渲染首页地图卡片，并在客户端按需加载高德地图 SDK。
 */
const AMapView: React.FC = () => {
  const { siteProfile } = useSiteConfig()
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [resolvedLocation, setResolvedLocation] = useState<ResolvedLocation>({
    longitude: siteProfile.location.longitude,
    latitude: siteProfile.location.latitude,
    label: '北京',
  })

  useEffect(() => {
    let isCancelled = false

    /**
     * 优先使用浏览器定位，失败时继续使用默认坐标。
     */
    async function resolveCurrentLocation() {
      const position = await getBrowserLocation()

      if (!position || isCancelled) {
        return
      }

      const nextLongitude = position.coords.longitude
      const nextLatitude = position.coords.latitude

      try {
        const label = await reverseGeocode(nextLongitude, nextLatitude)

        if (!isCancelled) {
          setResolvedLocation({
            longitude: nextLongitude,
            latitude: nextLatitude,
            label,
          })
        }
      } catch {
        if (!isCancelled) {
          setResolvedLocation({
            longitude: nextLongitude,
            latitude: nextLatitude,
            label: '当前位置',
          })
        }
      }
    }

    setResolvedLocation({
      longitude: siteProfile.location.longitude,
      latitude: siteProfile.location.latitude,
      label: '北京',
    })

    resolveCurrentLocation()

    return () => {
      isCancelled = true
    }
  }, [siteProfile.location.latitude, siteProfile.location.longitude])

  if (!AMAP_SETTINGS.key || !AMAP_SETTINGS.securityJsCode) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[12px] bg-[var(--card--bg)]">
        <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm text-[var(--text-color)]">
          请在 `.env.local` 中配置 `NEXT_PUBLIC_AMAP_KEY` 和 `NEXT_PUBLIC_AMAP_SECURITY_JS_CODE`
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="group relative h-full w-full overflow-hidden rounded-[12px]">
        <AMapCanvas
          className="absolute inset-0 h-full w-full"
          interactive={false}
          iconUrl={siteProfile.iconUrl}
          location={resolvedLocation}
          zoom={9}
        />
        <div
          className="absolute left-[12px] top-[12px] rounded-[16px] bg-[var(--ui-main-bg)] px-3 py-1 text-xs font-bold shadow-sm"
          style={{ fontFamily: 'LXGW WenKai Screen R, sans-serif' }}
        >
          {resolvedLocation.label}
        </div>
        <button
          type="button"
          aria-label="打开地图预览"
          className="detail-arrow absolute bottom-[10px] right-[12px] z-10 flex h-[36px] w-[36px] items-center justify-center rounded-[18px] bg-[var(--card--bg)] text-[var(--text-color)] transition-all duration-200 hover:shadow-[0_0_0_5px_var(--card-border)]"
          style={{ boxShadow: 'var(--card-border) 0px 0px 0px 2px' }}
          onClick={() => setIsPreviewOpen(true)}
        >
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      <AMapPreviewModal
        isOpen={isPreviewOpen}
        location={resolvedLocation}
        onClose={() => setIsPreviewOpen(false)}
      />
    </>
  )
}

export default AMapView
