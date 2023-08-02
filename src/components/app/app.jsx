import React from "react";
import { Switch, Route, Router as BrowserRouter } from "react-router-dom";
import Tetris from "../../games/tetris/board";
import browserHistory from '../../browser-history';
import './app.css'

const App = () => {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path="/">
          <div className="t-parent">
            <Tetris/>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;