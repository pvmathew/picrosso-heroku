import React, { useState, useEffect } from "react";
import {
  Grid,
  Header,
  Form,
  Segment,
  Button,
  Message,
  Icon,
  Container,
} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const HostSettings = (props) => {
  const [room, setRoom] = useState();
  const [test, setTest] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { t } = useTranslation();

  const handleGenerate = () => {
    axios.post("/room").then((res) => setRoom(res.data.room));
  };

  useEffect(() => {
    console.log(room);
  }, [room]);

  useEffect(() => {
    setTest(true);
  });

  if (room) {
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

            <Form size="large">
              <Segment stacked>
                <Header as="h3">{t("your_room_number")}</Header>
                <Segment>{room}</Segment>

                <Button onClick={() => history.push("/room/" + room)}>
                  {t("connect")}
                </Button>
              </Segment>
            </Form>
            <Message>
              <a href="#">{t("whats_this")}</a>
            </Message>
          </Grid.Column>
        </Grid>
      </Container>
    );
  } else {
    return (
      <Container>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h1" color="black" textAlign="center">
              <Container>
                <Button
                  icon
                  style={{
                    position: "absolute",
                    left: 10,
                    backgroundColor: "white",
                  }}
                  onClick={() => history.push("/")}
                >
                  <Icon name="arrow left" size="large" />
                </Button>
                <Icon
                  name="cube"
                  size="small"
                  style={{ marginRight: "0.5em" }}
                ></Icon>
                <Header.Content>PicrossO</Header.Content>
              </Container>
            </Header>

            <Form size="large">
              <Segment stacked>
                <Button
                  loading={loading}
                  onClick={() => {
                    setLoading(true);
                    handleGenerate();
                  }}
                  fluid
                  size="large"
                >
                  {t("generate_room")}
                </Button>
              </Segment>
            </Form>
            <Message>
              <a href="#">{t("whats_this")}</a>
            </Message>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
};

export default HostSettings;
