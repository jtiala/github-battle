import React from "react";
import { State, Interpreter } from "xstate";

import { AppContext, AppEvent, AppSchema } from "../state/app";
import Heading from "./Heading";
import Link from "./Link";
import AddUserForm from "./AddUserForm";

interface Props {
  current: State<AppContext, AppEvent, AppSchema>;
  send: Interpreter<AppContext, AppSchema, AppEvent>["send"];
}

const Header: React.FC<Props> = ({ current, send }) => (
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
    <AddUserForm current={current} send={send} />
  </header>
);

export default Header;
