import React from "react";

import Header from "./Header";
import BattleTable from "./BattleTable";

const App: React.FC = () => {
  return (
    <section className="container mx-auto my-4 flex flex-col items-center bg-white shadow-md">
      <Header />
      <main className="m-4">
        <BattleTable />
      </main>
    </section>
  );
};

export default App;
