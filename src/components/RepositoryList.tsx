import React from "react";
import { Interpreter } from "xstate";
import { useService } from "@xstate/react";

import {
  RepositoriesContext,
  RepositoriesEvent,
  RepositoriesSchema
} from "../state/repositories";
import Spinner from "./Spinner";
import Button from "./Button";
import Link from "./Link";

interface Props {
  service: Interpreter<
    RepositoriesContext,
    RepositoriesSchema,
    RepositoriesEvent
  >;
}

const RepositoryList: React.FC<Props> = ({ service }) => {
  const [current, send] = useService(service);

  if (current.matches("loading")) {
    return (
      <div className="flex justify-center">
        <div className="h-16 w-16">
          <Spinner />
        </div>
      </div>
    );
  }

  if (current.matches("failure")) {
    return (
      <div className="flex flex-col items-start">
        <p className="text-red-500 pb-1">Oops!</p>
        <Button size="small" onClick={() => send("RETRY")}>
          Retry
        </Button>
      </div>
    );
  }

  if (current.matches("loaded") && current.context.repositories.length) {
    return (
      <ul>
        {current.context.repositories.slice(0, 5).map(repo => (
          <li key={repo.id} className="flex flex-col mb-2">
            <Link href={repo.html_url} target="_blank">
              {repo.name}
            </Link>
            <span>{repo.description}</span>
            <span>Language: {repo.language}</span>
            <span>Stars: {repo.stargazers_count}</span>
          </li>
        ))}
      </ul>
    );
  }

  return <></>;
};

export default RepositoryList;
