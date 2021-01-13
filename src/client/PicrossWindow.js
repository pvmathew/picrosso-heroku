import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import Rows from "./PicrossWindowRows";
import "./PicrossWindow.css";

const PicrossWindow = (props) => {
  const meta = props.meta;
  const socket = props.socket;
  const [selectedCell, selectCell] = useState({});

  useEffect(() => {
    socket.current.on("new cell click", (receivedCell) => {
      selectCell(receivedCell);
    });
  });

  const handleClick = (cellID) => {
    socket.current.emit("cell click", cellID);
  };
  return (
    <Container textAlign="center">
      <table
        id="simple-board"
        cellSpacing="0"
        style={{ marginLeft: "auto", marginRight: "auto" }}
      >
        <tbody>
          <Rows
            meta={meta}
            handleClick={(id) => handleClick(id)}
            selectedCell={selectedCell}
          />
        </tbody>
      </table>
    </Container>
  );
};

export default PicrossWindow;
