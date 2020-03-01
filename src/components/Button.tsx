import React from "react";
import classNames from "classnames";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "text";
  size?: "normal" | "small" | "inline";
}

const classes = {
  base: "transition-all duration-150 ease-in disabled:opacity-75",
  primary:
    "flex items-center border-2 border-blue-400 bg-blue-400 hover:bg-blue-600 hover:border-blue-600 focus:bg-blue-600 focus:border-blue-800 text-white leading-none",
  text: "text-blue-600 hover:text-blue-800 disabled:opacity-50",
  normal: "p-4",
  small: "px-2 py-1"
};

const Button: React.FC<Props> = ({
  children,
  variant = "primary",
  size = "normal",
  type = "button",
  ...rest
}) => {
  const className = classNames(classes.base, {
    [classes.primary]: variant === "primary",
    [classes.text]: variant === "text",
    [classes.normal]: size === "normal" && variant !== "text",
    [classes.small]: size === "small" && variant !== "text"
  });

  return (
    <button type={type} className={className} {...rest}>
      {children}
    </button>
  );
};

export default Button;
