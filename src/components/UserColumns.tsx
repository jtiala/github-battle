import React from "react";
import classNames from "classnames";
import { Interpreter } from "xstate";
import { useService } from "@xstate/react";
import { formatDistanceToNow } from "date-fns";

import { AppContext } from "../state/app";
import { UserContext, UserSchema, UserEvent } from "../state/user";
import UserCard from "./UserCard";
import RepositoryList from "./RepositoryList";
import Button from "./Button";

const isWinner = (
  username: string,
  category: keyof AppContext["winners"],
  winners: AppContext["winners"]
): boolean => winners[category] === username;

const getColumnClasses = (
  variant: "odd" | "even" | "no-border" = "odd",
  isChampion: boolean = false,
  isWinner: boolean = false
): string =>
  classNames("px-4 py-2 text-center align-top", {
    "bg-white": !isWinner && variant === "odd",
    "bg-gray-100": !isWinner && variant === "even",
    "bg-green-200": isWinner && variant === "even",
    "bg-green-100": isWinner && variant === "odd",
    border: !isChampion && variant !== "no-border",
    "border border-l-4 border-r-4 border-green-500":
      isChampion && variant !== "no-border"
  });

interface Props {
  service: Interpreter<UserContext, UserSchema, UserEvent>;
  winners: AppContext["winners"];
  champion: string;
  handleRemove: Function;
}

const UserColumns: React.FC<Props> = ({
  service,
  winners,
  champion,
  handleRemove
}) => {
  const [current, send] = useService(service);
  const { user, username, repositories, total_stars } = current.context;

  if (current.matches("loading")) {
    return (
      <>
        <div></div>
        <div style={{ gridRow: "span 8 / span 8" }}>
          <UserCard username={username} />
        </div>
      </>
    );
  }

  if (current.matches("failure")) {
    return (
      <>
        <div></div>
        <div style={{ gridRow: "span 8 / span 8" }}>
          <UserCard
            username={username}
            retry={() => send("RETRY")}
            remove={() => handleRemove()}
          />
        </div>
      </>
    );
  }

  if (user && repositories) {
    const isChampion = user.login === champion;

    return (
      <>
        <div className={getColumnClasses("no-border", isChampion)}>
          {isChampion && (
            <span className="text-green-500 font-bold text-xl text-center">
              <span role="img" aria-label="Champion">
                🏆
              </span>{" "}
              Champion
            </span>
          )}
        </div>
        <div className={getColumnClasses("odd", isChampion)}>
          <UserCard user={user} username={username} />
        </div>
        <div
          className={getColumnClasses(
            "even",
            isChampion,
            isWinner(user.login, "created_at", winners)
          )}
        >
          <span className="not-sr-only lg:sr-only">Profile Age: </span>
          {formatDistanceToNow(new Date(user.created_at))}
        </div>
        <div
          className={getColumnClasses(
            "odd",
            isChampion,
            isWinner(user.login, "followers", winners)
          )}
        >
          <span className="not-sr-only lg:sr-only">Followers: </span>
          {user.followers}
        </div>
        <div
          className={getColumnClasses(
            "even",
            isChampion,
            isWinner(user.login, "following", winners)
          )}
        >
          <span className="not-sr-only lg:sr-only">Following: </span>
          {user.following}
        </div>
        <div
          className={getColumnClasses(
            "odd",
            isChampion,
            isWinner(user.login, "public_repos", winners)
          )}
        >
          <span className="not-sr-only lg:sr-only">
            Number of public repos:{" "}
          </span>
          {user.public_repos}
        </div>
        <div
          className={getColumnClasses(
            "even",
            isChampion,
            isWinner(user.login, "total_stars", winners)
          )}
        >
          <span className="not-sr-only lg:sr-only">Total stars: </span>
          {total_stars}
        </div>
        <div className={getColumnClasses("odd", isChampion)}>
          <span className="not-sr-only lg:sr-only">Top 5 repos: </span>
          <RepositoryList service={repositories} />
        </div>
        <div className={getColumnClasses("no-border", isChampion)}>
          <Button variant="text" onClick={() => handleRemove()}>
            Remove
          </Button>
        </div>
      </>
    );
  }

  return <></>;
};

export default UserColumns;
