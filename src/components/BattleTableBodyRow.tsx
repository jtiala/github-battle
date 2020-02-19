import React from "react";
import classNames from "classnames";

import { TableRow } from "./BattleTable";

interface Props {
  id: string;
  row: TableRow;
  colored?: boolean;
}

const BattleTableBodyRow: React.FC<Props> = ({ id, row, colored }) => {
  const tdClassName = classNames("px-4 py-2 border text-center align-top", {
    "bg-gray-100": colored
  });

  return (
    <tr className="p-2">
      <th className="px-4 py-2 text-right align-top">{row.heading}</th>
      {row.content.map((data, index) => (
        <td className={tdClassName} key={`row-${id}-${index}`}>
          {data}
        </td>
      ))}
    </tr>
  );
};

export default BattleTableBodyRow;
