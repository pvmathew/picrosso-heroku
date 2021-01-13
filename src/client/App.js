import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Home from "./Home";
import HostSettings from "./Host.js";
// import Room from "./Room";
import { CSSTransition } from "react-transition-group";
// import "semantic-ui-css/semantic.min.css";
import "./App.css";

const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/host", name: "Host Settings", Component: HostSettings },
  // { path: "/room/:id", name: "Room", Component: Room },
];

const App = () => {
  return (
    <>
      {routes.map(({ path, Component }) => (
        <Route key={path} exact path={path}>
          {({ match }) => {
            let currPath = match !== null ? match.path : null;
            let timeoutDuration = currPath === "/room/:id" ? 1000 : 0; // only applies animation when loading in room
            return (
              <CSSTransition
                in={match !== null}
                timeout={timeoutDuration}
                classNames="page"
                unmountOnExit
              >
                <div className="page">
                  <Component />
                </div>
              </CSSTransition>
            );
          }}
        </Route>
      ))}
    </>
  );
};

export default App;
