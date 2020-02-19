import React from "react";
import classNames from "classnames";

import { TableRow } from "./BattleTable";

interface Props {
  id: string;
  row: TableRow;
  totalColumns: number;
}

const BattleTableHeadRow: React.FC<Props> = ({ id, row, totalColumns }) => {
  const widthClass = totalColumns > 6 ? "w-1/6" : `w-1/${totalColumns}`;

  return (
    <tr className="p-2">
      <td className={widthClass} />
      {row.content.map((content, index) => (
        <th
          className={classNames("px-4 py-2 text-center align-top", widthClass)}
          key={`row-${id}-${index}`}
        >
          {content}
        </th>
      ))}
    </tr>
  );
};

export default BattleTableHeadRow;
