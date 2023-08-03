import React from "react";
import { Switch, Route, Router as BrowserRouter } from "react-router-dom";
import browserHistory from '../../browser-history';

import Home from "../../pages/home/home";
import Tetris from "../../games/tetris/tetris";

const App = () => {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path="/tetris">
          <Tetris />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;