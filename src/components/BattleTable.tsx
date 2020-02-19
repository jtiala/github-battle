import React from "react";
import { formatDistanceToNow } from "date-fns";
import { useService } from "@xstate/react";

import { usersService } from "../state/users";
import { User } from "../api/github";
import Loading from "./Loading";
import UserCard from "./UserCard";
import BattleTableHeadRow from "./BattleTableHeadRow";
import BattleTableBodyRow from "./BattleTableBodyRow";

export interface TableRow {
  heading?: string;
  content: React.ReactNode[];
}

export interface TableData {
  [rowName: string]: TableRow;
}

const buildTableData = (users: User[]): TableData => {
  const data: TableData = {
    user: { content: [] },
    profile_age: { heading: "Profile Age", content: [] },
    followers: { heading: "Followers", content: [] },
    following: { heading: "Following", content: [] },
    repos: { heading: "Number of public repos", content: [] }
  };

  users.forEach(user => {
    data["user"].content.push(<UserCard user={user} />);
    data["profile_age"].content.push(
      formatDistanceToNow(new Date(user.created_at))
    );
    data["followers"].content.push(user.followers);
    data["following"].content.push(user.following);
    data["repos"].content.push(user.public_repos);
  });

  return data;
};

const buildHeadRows = (data: TableData): React.ReactNode[] =>
  Object.entries(data).map(([id, row]) =>
    id === "user" ? (
      <BattleTableHeadRow
        key={`row-${id}`}
        id={id}
        row={row}
        totalColumns={Object.keys(row.content).length + 1}
      />
    ) : (
      undefined
    )
  );

const buildBodyRows = (data: TableData): React.ReactNode[] =>
  Object.entries(data).map(([id, row], index) =>
    id !== "user" ? (
      <BattleTableBodyRow
        key={`row-${id}`}
        id={id}
        row={row}
        colored={index % 2 === 0}
      />
    ) : (
      undefined
    )
  );

const BattleTable: React.FC = () => {
  const [current] = useService(usersService);

  if (current.matches("failure")) {
    return (
      <div>
        <h3>Error!</h3>
        <p>{current.context.error?.message}</p>
      </div>
    );
  }

  if (current.matches("loading")) {
    return <Loading />;
  }

  if (current.context.users.length > 0) {
    const data = buildTableData(current.context.users);
    const headRows = buildHeadRows(data);
    const bodyRows = buildBodyRows(data);

    return (
      <table className="table-fixed border-collapse">
        <thead>{headRows}</thead>
        <tbody>{bodyRows}</tbody>
      </table>
    );
  }

  return <></>;
};

export default BattleTable;
