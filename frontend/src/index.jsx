import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Route, Router } from "react-router";
import Home from "./containers/Home";
import GlobalStore from "./store";

export const history = createBrowserHistory();

function renderApp() {
  ReactDOM.render(
    <GlobalStore history={history}>
      <Router history={history}>
        <Route exact path="/" component={Home}/>
      </Router>
    </GlobalStore>,
    document.getElementById("react-app"),
  );
}

renderApp();
