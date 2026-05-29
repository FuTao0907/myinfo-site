'use client'

import React from 'react'
import { HOME_ASSETS } from '@/lib/constants/content/index'
import { AirplaneWindow } from '../../normal/AirplaneWindow'
import BentoMediaSurface from '../wrapper/BentoMediaSurface'

const PlaneView: React.FC = () => {
  return (
    <BentoMediaSurface className="pointer-events-auto grid place-items-center bg-[#163245]">
      <AirplaneWindow className="h-[300px] w-[160px]">
        <img className="h-full w-full object-cover" src={HOME_ASSETS.planeViewImage} alt="" />
      </AirplaneWindow>
    </BentoMediaSurface>
  )
}

export default PlaneView
