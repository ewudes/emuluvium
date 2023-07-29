import React from "react";
import { Switch, Route, Router as BrowserRouter } from "react-router-dom";
import Tetris from "../../games/tetris/tetris";
import browserHistory from '../../browser-history';

const App = () => {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path="/">
          <Tetris/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;