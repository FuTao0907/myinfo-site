"use client";

import React, { useEffect, useState } from 'react';
import { ShadowCard } from '../wrapper/ShadowCard';

const Dark: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    setIsDark(document.documentElement.classList.contains('dark'));
    return () => observer.disconnect();
  }, []);

  const toggleDark = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    if (nextIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <ShadowCard className="!p-[5px]">
      <div className="grid h-full w-full place-items-center">
        <label className="switch">
          <input type="checkbox" checked={!isDark} onChange={toggleDark} />
          <span className="slider" />
        </label>
      </div>
    </ShadowCard>
  );
};

export default Dark;
