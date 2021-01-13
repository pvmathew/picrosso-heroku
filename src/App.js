import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import NotHome from "./NotHome";
import "./App.css";

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/test" component={NotHome} />
  </Switch>
);

export default App;
