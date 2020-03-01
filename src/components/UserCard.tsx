import React from "react";

import { User } from "../state/user";
import Heading from "./Heading";
import Spinner from "./Spinner";
import Link from "./Link";
import Button from "./Button";

interface Props {
  user?: User;
  username: string;
  retry?: Function;
  remove?: Function;
}

const UserCard: React.FC<Props> = ({ user, username, retry, remove }) => {
  if (typeof retry === "function" && typeof remove === "function") {
    return (
      <div className="p-2 flex flex-col items-center font-normal">
        <p className="text-red-500 pb-1">Oops!</p>
        <div className="pb-1">
          <Button size="small" onClick={() => retry()}>
            Retry
          </Button>
        </div>
        <Button size="small" onClick={() => remove()}>
          Remove
        </Button>
        <div className="mt-2">
          <div className="font-semibold">
            <Link
              href={`https://github.com/${username}`}
              target="_blank"
              variant="secondary"
            >
              @{username}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-2 flex flex-col items-center font-normal">
        <div className="h-24 w-24">
          <Spinner />
        </div>
        <div className="mt-2">
          <div className="font-semibold">
            <Link
              href={`https://github.com/${username}`}
              target="_blank"
              variant="secondary"
            >
              @{username}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 flex flex-col items-center font-normal">
      <Link
        href={`https://github.com/${user.login}`}
        target="_blank"
        variant="secondary"
      >
        <img
          className="h-24 w-24 rounded-full hover:opacity-75"
          src={user.avatar_url}
          alt={user.name}
        />
      </Link>
      <div className="mt-2">
        <Heading level="h3">{user.name}</Heading>
        <div className="font-semibold">
          <Link
            href={`https://github.com/${user.login}`}
            target="_blank"
            variant="secondary"
          >
            @{user.login}
          </Link>
        </div>
      </div>
      <ul className="my-2 list-none">
        {user.location && <li className="text-gray-800">{user.location}</li>}
        {user.company && <li className="text-gray-800">{user.company}</li>}
        {user.blog && (
          <li className="text-gray-800">
            <Link href={user.blog} target="_blank" variant="secondary">
              {user.blog}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserCard;
