"use client";

import React, { useState, useEffect } from "react";
import { ShadowBlock } from "../wrapper/ShadowBlock";

const CountDown: React.FC = () => {
  const [time, setTime] = useState("00.00");

  useEffect(() => {
    const calculateTime = () => {
      const year = new Date().getFullYear();
      const daysInYear = new Date(year, 2, 0).getDate() === 29 ? 366 : 365;
      const today = Math.floor(
        (new Date().getTime() - new Date(year, 0, 0).getTime()) / 86400000,
      );
      const daysGone = today + 1;
      const percentage = ((daysGone / daysInYear) * 100).toFixed(2);
      setTime(Number(percentage) < 10 ? `0${percentage}` : percentage);
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ShadowBlock className="w-full h-full text-[5rem]">
      <div className="relative h-full w-full" style={{ fontFamily: "Digital" }}>
        <span className="absolute left-[50%] top-[50%] w-[180px] flex flex-row -translate-x-1/2 -translate-y-1/2 justify-center">
          <span>{time.slice(0, 2)}</span>
          <div className="relative grid w-fit place-items-center">
            <div className="opacity-0">:</div>
            <div className="absolute left-[1px] top-0 w-full">.</div>
          </div>
          <span>{time.slice(3)}</span>
        </span>

        {Number(time) !== 100 && Number(time) !== 100.0 && (
          <span className="absolute left-[50%] top-[50%] w-[180px] text-[#0000001c] -translate-x-1/2 -translate-y-1/2 dark:text-[#ffffff1c] flex justify-center">
            00:00
          </span>
        )}

        <span className="absolute left-[calc(50%_-_150px)] top-[50%] text-[24px] opacity-30">
          <span>{new Date().getFullYear()}</span>
        </span>
        <span className="absolute left-[calc(50%_+_100px)] top-[50%] text-[24px] opacity-30">
          %
        </span>
      </div>
    </ShadowBlock>
  );
};

export default CountDown;
