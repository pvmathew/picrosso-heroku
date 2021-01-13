import React, { useEffect, useState, useRef } from "react";
import {
  Grid,
  Header,
  Form,
  Segment,
  Button,
  Message,
  Icon,
  // Transition,
  Container,
} from "semantic-ui-react";
import { CSSTransition } from "react-transition-group";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Main = (props) => {
  const history = useHistory();
  const [roomNumber, setRoomNumber] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [meta, setMeta] = useState({});

  const checkRoomStatus = async () => {
    if (!roomNumber || isNaN(parseInt(roomNumber))) {
      return false;
    } else {
      const res = await axios.get("/room" + "?id=" + roomNumber);
      if (!res.data.open) {
        return false;
      } else {
        setMeta(res.data.meta);
        return true;
      }
    }
  };

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setTimeout(() => {
        history.push({ pathname: "/room/" + roomNumber, state: { meta } });
      }, 2000);
    }
  }, [meta]);

  return (
    <Container>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" color="black" textAlign="center">
            <Header.Content>
              <Icon name="cube" size="small"></Icon>
              PicrossO
            </Header.Content>
          </Header>
          <Form size="large" error={error}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="chevron right"
                iconPosition="left"
                placeholder="Room Number"
                onChange={(e) => setRoomNumber(e.target.value)}
                value={roomNumber}
              />

              {success && (
                <Message positive header="Room found! Now joining..." />
              )}

              {error && (
                <Message error header="Please enter a valid room number" />
              )}

              <Button
                onClick={async () => {
                  const open = await checkRoomStatus();
                  if (open) {
                    setError(false);
                    setSuccess(true);
                  } else {
                    setError(true);
                  }
                }}
                color="black"
                fluid
                size="large"
              >
                Join Room
              </Button>
              <Button
                onClick={() => history.push("/host")}
                style={{ marginTop: "1em" }}
                fluid
                size="large"
              >
                Host Room
              </Button>
            </Segment>
          </Form>
          <Message>
            <a href="#">What is this?</a>
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Main;
