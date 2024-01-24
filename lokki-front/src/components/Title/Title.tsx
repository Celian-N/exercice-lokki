import React, { FC, PropsWithChildren } from "react";
import "./Title.scss";

type TitleProps = PropsWithChildren<{
  color?: string;
}>;

export const Title: FC<TitleProps> = (props) => {
  const { children, color } = props;
  return (
    <div className="title" style={{ color }}>
      {children}
    </div>
  );
};
