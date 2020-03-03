import React, { useState, FormEvent } from "react";
import { Interpreter } from "xstate";

import { AppContext, AppEvent, AppSchema } from "../state/app";
import Input from "./Input";
import Button from "./Button";

const exampleUsers = ["jtiala", "davidkpiano", "adamwathan", "gaearon"];
const getExampleUser = (index: number): string => exampleUsers[index];

interface Props {
  send: Interpreter<AppContext, AppSchema, AppEvent>["send"];
}

const AddUserForm: React.FC<Props> = ({ send }) => {
  const [username, setUsername] = useState("");
  const [currentExample, setCurrentExample] = useState(0);

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    send({ type: "ADD_USER", username });
    setUsername("");
  };

  const addExampleUser = () => {
    send({
      type: "ADD_USER",
      username: getExampleUser(currentExample)
    });
    setCurrentExample(currentExample + 1);
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
          disabled={currentExample === exampleUsers.length}
        >
          add an example user
        </Button>
      </span>
    </>
  );
};

export default AddUserForm;
