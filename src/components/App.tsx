import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useMachine } from "@xstate/react";
import { useHistory } from "react-router-dom";

import { createAppMachine } from "../state/app";
import Header from "./Header";
import BattleTable from "./BattleTable";
import Footer from "./Footer";

const App: React.FC = () => {
  const history = useHistory();

  const [current, send] = useMachine(createAppMachine(), {
    context: { history }
  });

  return (
    <section className="container mx-auto my-4 flex flex-col items-stretch bg-white shadow-md">
      <Header send={send} />
      <Switch>
        <Route>
          <BattleTable current={current} send={send} />
        </Route>
      </Switch>
      <Footer />
    </section>
  );
};

const RouterApp: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default RouterApp;
