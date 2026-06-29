"use client";

import React from 'react';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const ShadowBlock: React.FC<Props> = ({ className = '', children }) => {
  return (
    <div className={`out-box ${className}`}>
      <div className="inner-box-1">
        <div className="inner-box-2">
          <div className="content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

