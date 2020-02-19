import React from "react";

import { User } from "../api/github";
import Heading from "./Heading";
import Spinner from "./Spinner";
import Link from "./Link";

interface Props {
  user?: User;
}

const UserCard: React.FC<Props> = ({ user }) => (
  <div className="flex flex-col items-center font-normal">
    {!user ? (
      <div className="h-24 w-24">
        <Spinner />
      </div>
    ) : (
      <>
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
        <div className="my-2">
          {user && (
            <>
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
            </>
          )}
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
      </>
    )}
  </div>
);

export default UserCard;
