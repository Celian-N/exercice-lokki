import React, { FC } from "react";
import "./LokkiSelect.scss";
type Option = { value: string; label: string };

type LokkiSelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  options: Option[];
};

export const LokkiSelect: FC<LokkiSelectProps> = (props) => {
  const { options, ...selectProps } = props;
  return (
    <select className="lokki-select" {...selectProps}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
