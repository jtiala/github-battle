import React from "react";
import classNames from "classnames";
import { useService } from "@xstate/react";

import { appService } from "../state/app";
import UserColumns from "./UserColumns";

const BattleTable: React.FC = () => {
  const [current, send] = useService(appService);
  const usersCount = Object.values(current.context.users).length;

  if (usersCount) {
    const { users, winners, champion } = current.context;

    const titleColumns = () => {
      const className = "px-4 py-2 text-right align-top hidden md:block";

      return (
        <>
          <div className={className}></div>
          <div className={className}></div>
          <div className={className}>Profile Age</div>
          <div className={className}>Followers</div>
          <div className={className}>Following</div>
          <div className={className}>Number of public repos</div>
          <div className={className}>Total stars</div>
          <div className={className}>Top 5 repos</div>
          <div className={className}></div>
        </>
      );
    };

    const style = {
      gridTemplateRows: `repeat(${9}, auto)`,
      gridAutoFlow: "column",
      gridAutoColumns: `${100 / (usersCount + 1)}%`
    };

    const className = classNames("flex flex-col md:grid m-4", {
      "w-1/2 self-center": usersCount === 1,
      "w-3/4 self-center": usersCount === 2
    });

    return (
      <div style={style} className={className}>
        {titleColumns()}
        {Object.entries(users).map(([username, user], index) => (
          <UserColumns
            key={username}
            service={user}
            winners={winners}
            champion={champion}
            handleRemove={() => send({ type: "REMOVE_USER", username })}
          />
        ))}
      </div>
    );
  }

  return <></>;
};

export default BattleTable;
