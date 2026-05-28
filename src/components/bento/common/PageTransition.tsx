"use client";

import React, { useState, useEffect } from 'react';
import { ShadowCard } from '../wrapper/ShadowCard';

const PageTransition: React.FC = () => {
  const [transitionName, setTransitionName] = useState('page');

  useEffect(() => {
    const stored = localStorage.getItem('currentTransitionName');
    if (stored) {
      setTransitionName(stored);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTransitionName(val);
    localStorage.setItem('currentTransitionName', val);
    window.dispatchEvent(new Event('transitionNameChange'));
  };

  return (
    <ShadowCard className="!p-[5px]">
      <div className="h-full w-full flex flex-col items-center justify-center gap-[16px]">
        <div className="mx-[10px] w-full px-2">
          <span className="block text-[14px] font-bold">
            页面过渡动画：<span className="capitalize">{transitionName.slice(0, 4)}</span>
          </span>
          <span className="block text-[12px] leading-[16px] opacity-40">
            改变后可以切换页面查看效果
          </span>
        </div>
        <div className="w-full">
          <form className="form">
            <label className="label">
              <input 
                checked={transitionName === 'page'} 
                value="page" 
                name="band" 
                type="radio" 
                className="input" 
                onChange={handleChange} 
              />
            </label>
            <label className="label">
              <input 
                checked={transitionName === 'fade'} 
                value="fade" 
                name="band" 
                type="radio" 
                className="input" 
                onChange={handleChange} 
              />
            </label>
            <label className="label">
              <input 
                checked={transitionName === 'translateY'} 
                value="translateY" 
                name="band" 
                type="radio" 
                className="input" 
                onChange={handleChange} 
              />
            </label>
          </form>
        </div>
      </div>
    </ShadowCard>
  );
};

export default PageTransition;
