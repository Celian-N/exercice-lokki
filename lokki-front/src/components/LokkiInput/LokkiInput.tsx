import React, { FC } from "react";
import "./LokkiInput.scss";

type LokkiInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const LokkiInput: FC<LokkiInputProps> = (inputProps) => {
  return <input className="lokki-input" {...inputProps} />;
};
