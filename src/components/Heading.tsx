import React from "react";
import classNames from "classnames";

interface Props {
  level: "h1" | "h2" | "h3";
  children?: React.ReactNode;
}

const Heading: React.FC<Props> = ({ level, children }) => {
  const classes = "font-semibold leading-none";

  switch (level) {
    case "h1":
      return <h1 className={classNames(classes, "text-4xl")}>{children}</h1>;
    case "h2":
      return <h2 className={classNames(classes, "text-2xl")}>{children}</h2>;
    case "h3":
      return <h3 className={classNames(classes, "text-xl")}>{children}</h3>;
  }
};

export default Heading;
