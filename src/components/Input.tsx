import React from "react";
import classNames from "classnames";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelHidden?: boolean;
}

const Input: React.FC<Props> = ({ label, labelHidden = false, ...rest }) => (
  <label className="flex flex-col">
    <span className={classNames("mb-1", { "sr-only": labelHidden })}>
      {label}
    </span>
    <input
      className="w-full p-4 border-2 border-blue-400 hover:border-blue-600 focus:border-blue-800 leading-none transition-all duration-150 ease-in"
      {...rest}
    />
  </label>
);

export default Input;
