import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import {
  Container,
  List,
  Header,
  Form,
  Button,
  Segment,
  Icon,
  Grid,
  Loader,
} from "semantic-ui-react";
// import PicrossWindow from "./PicrossWindow";
import CloseRoomModal from "./CloseRoomModal";
// import WinModal from "./WinModal";
import socketIOClient from "socket.io-client";

const Room = (props) => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEnd = useRef();
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({});
  const [won, setWon] = useState(false);

  let socket = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (!open) {
      history.push("/");
    }
  }, [open]);

  useEffect(async () => {
    // if (props.location.state !== undefined) {
    //   console.log("Loading meta from location state!");
    //   setMeta(props.location.state.meta);
    // } else {
    console.log("Fetching room meta data...");
    //check if room exists, otherwise go home
    const res = await axios.get("/room" + "?id=" + id);
    // .then((res) => console.log(res.data.open));
    if (!res.data.open) {
      // if the room being joined isnt open
      history.push("/");
    } //else {
    let data = res.data.meta;
    let parsedRows = await eval(data.a_rows);
    let parsedCols = await eval(data.a_columns);

    data.a_rows = parsedRows;
    data.a_columns = parsedCols;

    setMeta(data);
    setLoading(false);

    socket.current = socketIOClient("?id=" + id);

    // socket.current.on("new message", (msg) => {
    //   setMessages((prevMsgs) => [...prevMsgs, msg]);
    // });

    // socket.current.on("finished puzzle", () => {
    //   console.log("You finished the puzzle! Congrats!");
    //   setWon(true);
    // });

    // return () => {
    //   socket.current.off("new message");
    // };
  }, []);

  // const scrollToBottom = () => {
  //   messagesEnd.current.scrollIntoView({ behavior: "auto" });
  // };

  // useEffect(scrollToBottom, [messages, message]);

  // const MessageList = () => (
  //   <Segment
  //     basic
  //     style={{ overflow: "auto", height: 80, paddingTop: 0 }}
  //     id="message-list"
  //   >
  //     <List>
  //       {messages.map((message, index) => (
  //         <List.Item key={index}>User: {message}</List.Item>
  //       ))}
  //     </List>
  //     <div ref={messagesEnd}></div>
  //   </Segment>
  // );

  // const handleSubmit = () => {
  //   socket.current.emit("chat message", message);
  //   setMessage("");
  // };

  return (
    <>
      <Container style={{ paddingTop: 30 }}>
        <Grid>
          <Grid.Column floated="left" width={5}>
            <Button onClick={() => history.push("/")}>
              BUTT
              <Icon name="arrow left" size="small" /> Back
            </Button>
          </Grid.Column>
          <Grid.Column floated="right" width={5} textAlign="right">
            <CloseRoomModal id={id} closeRoom={() => setOpen(false)} />
          </Grid.Column>
        </Grid>
        <Grid textAlign="center" verticalAlign="top">
          <Grid.Column>
            {/* {loading ? (
              <Loader />
            ) : (
              <PicrossWindow meta={meta} socket={socket} />
            )}

            <WinModal won={won} id={id} closeRoom={() => setOpen(false)} /> */}

            <Segment textAlign="left">
              <Header dividing>CHAT</Header>
              {/* <MessageList /> */}
              <Form onSubmit={() => handleSubmit()}>
                <Form.Field>
                  <input
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    placeholder="Enter a message here!"
                  />
                </Form.Field>
                <Button type="submit">Submit</Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
};

export default Room;
