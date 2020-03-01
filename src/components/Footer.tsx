import React from "react";
import Link from "./Link";

const Footer: React.FC = () => (
  <div className="m-2 text-gray-600 text-sm text-center">
    <Link variant="dark" href="https://xstate.js.org" target="_blank">
      XState
    </Link>{" "}
    case study by{" "}
    <Link variant="dark" href="https://twitter.com/tjiala" target="_blank">
      jtiala
    </Link>
    . Check out the source at{" "}
    <Link
      variant="dark"
      href="https://github.com/jtiala/github-battle"
      target="_blank"
    >
      GitHub
    </Link>
    !
  </div>
);

export default Footer;
