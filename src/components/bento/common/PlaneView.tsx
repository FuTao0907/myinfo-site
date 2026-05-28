"use client";

import React from "react";
import { AirplaneWindow } from "../../normal/AirplaneWindow";

const PlaneView: React.FC = () => {
  return (
    <div className="pointer-events-auto grid h-full w-full place-items-center rounded-[10px] bg-[#163245]">
      <AirplaneWindow className="h-[300px] w-[160px]">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1570885865089-6627ac32a60a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </AirplaneWindow>
    </div>
  );
};

export default PlaneView;
