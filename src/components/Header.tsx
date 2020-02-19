import React from "react";

import Heading from "./Heading";
import Link from "./Link";
import AddUserForm from "./AddUserForm";

const Header: React.FC = () => (
  <header className="m-4 flex flex-col items-center ">
    <div className="my-8">
      <Heading level="h1">
        <Link href="/" variant="dark">
          GitHub Battle{" "}
          <span role="img" aria-label="explosion">
            💥
          </span>
        </Link>
      </Heading>
    </div>
    <AddUserForm />
  </header>
);

export default Header;
