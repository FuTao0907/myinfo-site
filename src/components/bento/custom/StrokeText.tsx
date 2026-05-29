"use client";

import React, { useState } from "react";
import BentoContentStack from "../wrapper/BentoContentStack";
import { ShadowCard } from "../wrapper/ShadowCard";

const StrokeText: React.FC = () => {
  const [, setIsOpen] = useState(false);

  return (
    <ShadowCard className="!p-[5px]">
      <BentoContentStack
        className="gap-[10px] text-[--text-color]"
        onClick={() => setIsOpen(true)}
      >
        <p className="en pointer-events-auto mr-[50px] w-[100px] cursor-pointer text-3xl font-extrabold transition-all duration-300 ease-in-out">
          Stroke Text
        </p>
        <span className="cn pointer-events-auto cursor-pointer text-4xl font-extrabold transition-all duration-300 ease-in-out">
          描边字体
        </span>
      </BentoContentStack>
    </ShadowCard>
  );
};

export default StrokeText;
