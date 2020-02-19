import React from "react";
import classNames from "classnames";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "text";
}

const classes = {
  primary:
    "flex items-center p-4 border-2 border-blue-400 bg-blue-400 hover:bg-blue-600 hover:border-blue-600 focus:bg-blue-600 focus:border-blue-800 disabled:opacity-75 text-white leading-none transition-all duration-150 ease-in",
  text: "text-blue-600 hover:text-blue-800"
};

const Button: React.FC<Props> = ({
  children,
  variant = "primary",
  type = "button",
  ...rest
}) => {
  const className = classNames({
    [classes.primary]: variant === "primary",
    [classes.text]: variant === "text"
  });

  return (
    <button type={type} className={className} {...rest}>
      {children}
    </button>
  );
};

export default Button;
