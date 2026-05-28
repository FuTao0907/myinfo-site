"use client";

import React, { useState } from "react";
import { ShadowCard } from "../wrapper/ShadowCard";

const StrokeText: React.FC = () => {
  const [, setIsOpen] = useState(false);

  return (
    <ShadowCard className="!p-[5px]">
      <div
        className="h-full w-full flex flex-col items-center justify-center gap-[10px] text-[--text-color]"
        onClick={() => setIsOpen(true)}
      >
        <p className="en pointer-events-auto mr-[50px] w-[100px] cursor-pointer text-3xl font-extrabold transition-all duration-300 ease-in-out">
          Stroke Text
        </p>
        <span className="cn pointer-events-auto cursor-pointer text-4xl font-extrabold transition-all duration-300 ease-in-out">
          描边字体
        </span>
      </div>
    </ShadowCard>
  );
};

export default StrokeText;
