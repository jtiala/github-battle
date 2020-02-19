import React from "react";

import { User } from "../api/github";
import Heading from "./Heading";

interface Props {
  user: User;
}

const UserCard: React.FC<Props> = ({ user }) => (
  <div className="flex items-start font-normal">
    <img
      className="h-24 w-24 mr-4 rounded-full"
      src={user.avatar_url}
      alt={user.name}
    />
    <div className="flex flex-col items-start">
      <div className="my-2 text-left">
        <Heading level="h3">{user.name}</Heading>
        <div className="text-gray-800 font-semibold">@{user.login}</div>
      </div>
      <ul className="list-none text-left">
        {user.company && (
          <li className="text-gray-800">
            <span role="img" aria-label="Company">
              💼
            </span>{" "}
            {user.company}
          </li>
        )}
        {user.location && (
          <li className="text-gray-800">
            <span role="img" aria-label="Location">
              🗺
            </span>{" "}
            {user.location}
          </li>
        )}
        {user.blog && (
          <li className="text-gray-800">
            <span role="img" aria-label="Website">
              🔗
            </span>{" "}
            {user.blog}
          </li>
        )}
      </ul>
    </div>
  </div>
);

export default UserCard;
