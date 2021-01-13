import React, { useEffect, useState } from "react";
import { Modal, Header, Icon, Button } from "semantic-ui-react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import "./WinModal.css";

const WinModal = (props) => {
  const open = props.won;
  const [animate, doAnimate] = useState(false);

  const closeRoom = () => {
    axios.delete("/room?id=" + props.id).then((res) => {
      if (res.data.closed) {
        console.log("room was closed!");
        props.closeRoom();
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      doAnimate(true);
    }, 500);
  }, []);

  useEffect(() => console.log(animate), [animate]);

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
    >
      <Header icon>
        <CSSTransition
          timeout={1000}
          in={animate}
          classNames="win"
          unmountOnExit
        >
          <div className="win-div">
            <Icon name="flag checkered" />
          </div>
        </CSSTransition>
        <div style={{ marginTop: "50px" }}>You won! Congrats!</div>
      </Header>
      <Modal.Content>
        <p></p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          basic
          color="red"
          inverted
          onClick={() => {
            closeRoom();
          }}
        >
          <Icon name="remove" /> Close Room
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default WinModal;
