import React, { useState, FormEvent } from "react";
import { useService } from "@xstate/react";

import { usersService } from "../state/users";
import Input from "./Input";
import Button from "./Button";

const exampleUsers = ["jtiala", "gaearon", "davidkpiano", "adamwathan"];
const getExampleUser = (index: number): string =>
  exampleUsers[index % exampleUsers.length];

const AddUserForm: React.FC = () => {
  const [, send] = useService(usersService);
  const [login, setLogin] = useState("");
  const [currentExample, setCurrentExample] = useState(0);

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    send({ type: "FETCH", login });
    setLogin("");
  };

  const addExampleUser = () => {
    send({
      type: "FETCH",
      login: getExampleUser(currentExample)
    });
    setCurrentExample(currentExample + 1);
  };

  return (
    <form className="flex items-end" onSubmit={submitForm}>
      <div className="m-1">
        <Input
          label="GitHub username"
          labelHidden={true}
          placeholder="GitHub username"
          value={login}
          onChange={event => setLogin(event.target.value)}
        />
      </div>
      <div className="m-1 flex items-center">
        <Button type="submit" disabled={!login}>
          Add user
        </Button>
        <span className="ml-4">
          ...or{" "}
          <Button variant="text" onClick={addExampleUser}>
            add a thought leader
          </Button>
        </span>
      </div>
    </form>
  );
};

export default AddUserForm;
