import React from "react";
import classNames from "classnames";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "dark";
}

const classes = {
  primary: "text-blue-600 hover:text-blue-800",
  secondary: "text-gray-600 hover:text-gray-800",
  dark: "text-gray-800 hover:text-gray-700"
};

const Link: React.FC<Props> = ({ variant = "primary", children, ...rest }) => {
  const className = classNames({
    [classes.primary]: variant === "primary",
    [classes.secondary]: variant === "secondary",
    [classes.dark]: variant === "dark"
  });

  return (
    <a {...rest} className={className}>
      {children}
    </a>
  );
};

export default Link;
