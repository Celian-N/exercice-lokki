import React, { FC, PropsWithChildren } from "react";
import "./Caption.scss";
type CaptionProps = PropsWithChildren<{ color?: string }>;

export const Caption: FC<CaptionProps> = (props) => {
  const { children, color } = props;
  return (
    <div className="caption" style={{ color }}>
      {children}
    </div>
  );
};
