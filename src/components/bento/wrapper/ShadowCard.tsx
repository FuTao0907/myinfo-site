"use client";

import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
}

export const ShadowCard: React.FC<Props> = ({
  className = "",
  children,
  footer,
  style,
}) => {
  return (
    <div className={`card-outer ${className}`} style={style}>
      <div className="card-content">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};
