import React from "react";

import Heading from "./Heading";
import AddUserForm from "./AddUserForm";

const Header: React.FC = () => (
  <header className="m-4 flex flex-col items-center ">
    <div className="my-8">
      <Heading level="h1">
        GitHub Battle{" "}
        <span role="img" aria-label="explosion">
          💥
        </span>
      </Heading>
    </div>
    <AddUserForm />
  </header>
);

export default Header;
