"use client";

import React from "react";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const AirplaneWindow: React.FC<Props> = ({
  className = "",
  children,
}) => {
  return (
    <div className="airplane-main-container pointer-events-none grid place-items-center bg-[#163245] p-[10px] box-border rounded-[10px] h-fit w-fit">
      {/* 最外层 Border */}
      <div className={`airplane-out-box ${className}`}>
        <div className="airplane-sunrays" />

        {/* 窗户盖子 */}
        <div className="airplane-cap">
          {/* 窗户的按钮 */}
          <div className="airplane-cap-btn" />
        </div>
        
        {/* 里面一层 Border */}
        <div className="airplane-inner-box-1">
          {/* 里面第二层 border */}
          <div className="airplane-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

