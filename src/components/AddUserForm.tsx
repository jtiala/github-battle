import React, { useState, FormEvent } from "react";
import { State, Interpreter } from "xstate";

import { AppContext, AppEvent, AppSchema } from "../state/app";
import Input from "./Input";
import Button from "./Button";

interface Props {
  current: State<AppContext, AppEvent, AppSchema>;
  send: Interpreter<AppContext, AppSchema, AppEvent>["send"];
}

const AddUserForm: React.FC<Props> = ({ current, send }) => {
  const [username, setUsername] = useState("");

  const exampleUsers = ["jtiala", "davidkpiano", "adamwathan", "gaearon"];
  const availableExampleUsers = exampleUsers.filter(
    user => !Object.keys(current.context.users).includes(user)
  );

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    send({ type: "ADD_USER", username });
    setUsername("");
  };

  const addExampleUser = () => {
    send({
      type: "ADD_USER",
      username: availableExampleUsers[0]
    });
  };

  return (
    <>
      <form className="flex items-center" onSubmit={submitForm}>
        <Input
          label="GitHub username"
          labelHidden={true}
          placeholder="GitHub username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <div className="ml-1">
          <Button type="submit" disabled={!username}>
            Add user
          </Button>
        </div>
      </form>
      <span className="mt-1">
        ...or{" "}
        <Button
          variant="text"
          onClick={addExampleUser}
          disabled={!availableExampleUsers.length}
        >
          add an example user
        </Button>
      </span>
    </>
  );
};

export default AddUserForm;
