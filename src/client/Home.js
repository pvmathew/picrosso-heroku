import React from "react";
import logo from "./react.svg";
import "./Home.css";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";

const Home = () => {
  const history = useHistory();

  return (
    <div className="Home">
      <div className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <h2>Home</h2>
      </div>
      <p className="Home-intro">
        To get started, edit <code>src/App.js</code> or <code>src/Home.js</code>{" "}
        and save to reload.
      </p>
      <Button onClick={() => history.push("/test")}>CLICK ME</Button>
    </div>
  );
};

export default Home;
