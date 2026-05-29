'use client'

import React from 'react'
import { HOME_ASSETS } from '@/lib/constants/content/index'
import { AirplaneWindow } from '../../normal/AirplaneWindow'

const PlaneView: React.FC = () => {
  return (
    <div className="pointer-events-auto grid h-full w-full place-items-center rounded-[10px] bg-[#163245]">
      <AirplaneWindow className="h-[300px] w-[160px]">
        <img className="h-full w-full object-cover" src={HOME_ASSETS.planeViewImage} alt="" />
      </AirplaneWindow>
    </div>
  )
}

export default PlaneView
