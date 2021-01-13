import React, { useState } from "react";
import { Modal, Header, Icon, Button } from "semantic-ui-react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";

const CloseRoomModal = (props) => {
  const [open, setOpen] = useState(false);

  const closeRoom = () => {
    axios.delete("/room?id=" + props.id).then((res) => {
      if (res.data.closed) {
        console.log("room was closed!");
        props.closeRoom();
      }
    });
  };

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={<Button color="red">Close Room</Button>}
    >
      <Header icon>
        <CSSTransition appear timeout={300} in classNames="modal-transition">
          <Icon name="window close" />
        </CSSTransition>
        Close Room
      </Header>
      <Modal.Content>
        <p>Are you sure you would like to close this room?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted onClick={() => setOpen(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button
          color="green"
          inverted
          onClick={() => {
            setOpen(false);
            closeRoom();
          }}
        >
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CloseRoomModal;
