import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const Weekly: React.FC = () => {
  return (
    <div className="relative select-none overflow-hidden rounded-[10px] bg-[var(--card--bg)] w-full h-full group">
      <img
        className="pointer-events-none h-full w-full select-none object-fill dark:opacity-0 opacity-100 transition-opacity"
        src="/wrap-bg.svg"
        alt=""
      />
      <img
        className="pointer-events-none absolute left-0 top-0 h-auto w-[370px] select-none object-fill"
        src="https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/imagesweekly.webp"
        style={{ transform: "rotate(330deg) translate3d(100px, 10px, 10px)" }}
        alt=""
      />

      <Link
        className="detail-arrow absolute left-[12px] bottom-[10px] z-10 flex justify-center items-center w-[36px] h-[36px] rounded-[18px] text-[var(--text-color)] bg-[var(--card--bg)] pointer-events-auto transition-all duration-200 hover:shadow-[0_0_0_5px_var(--card-border)]"
        style={{ boxShadow: "var(--card-border) 0px 0px 0px 2px" }}
        href="/daily"
      >
        <ArrowUpRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default Weekly;
