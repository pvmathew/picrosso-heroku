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
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./LanguageSelect";

const Main = (props) => {
  const history = useHistory();
  const [roomNumber, setRoomNumber] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [meta, setMeta] = useState({});
  const { t } = useTranslation();

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
                placeholder={t("room_number")}
                onChange={(e) => setRoomNumber(e.target.value)}
                value={roomNumber}
              />

              {success && (
                <Message positive header={t("found_room")} />
              )}

              {error && (
                <Message error header={t("wrong_room_number")} />
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
                {t("join_room")}
              </Button>
              <Button
                onClick={() => history.push("/host")}
                style={{ marginTop: "1em" }}
                fluid
                size="large"
              >
                {t("host_room")}
              </Button>
            </Segment>
          </Form>
          <Message>
            <a href="#">{t("whats_this")}</a>
          </Message>
          <LanguageSelect />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Main;
