import React from "react";
import { Switch, Route, Router as BrowserRouter } from "react-router-dom";
import browserHistory from '../../browser-history';
import './../../style.scss';
import '../../vendor/fonts/fonts.scss';

import Home from "../../pages/home/home";
import Tetrogrid from "../../games/tetrogrid/tetrogrid";

const App = () => {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path="/tetrogrid">
          <Tetrogrid />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;