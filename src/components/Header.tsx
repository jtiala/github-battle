import React from "react";
import { Interpreter } from "xstate";

import { AppContext, AppEvent, AppSchema } from "../state/app";
import Heading from "./Heading";
import Link from "./Link";
import AddUserForm from "./AddUserForm";

interface Props {
  send: Interpreter<AppContext, AppSchema, AppEvent>["send"];
}

const Header: React.FC<Props> = ({ send }) => (
  <header className="m-4 flex flex-col items-center ">
    <div className="my-8">
      <Heading level="h1">
        <Link href="/" variant="dark">
          <span role="img" aria-label="explosion">
            💥
          </span>{" "}
          GitHub Battle
        </Link>
      </Heading>
    </div>
    <AddUserForm send={send} />
  </header>
);

export default Header;
