import React from "react";

import Header from "./Header";
import BattleTable from "./BattleTable";
import Footer from "./Footer";

const App: React.FC = () => (
  <section className="container mx-auto my-4 flex flex-col items-stretch bg-white shadow-md">
    <Header />
    <BattleTable />
    <Footer />
  </section>
);

export default App;
