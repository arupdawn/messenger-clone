import React, { useState, useEffect } from "react";
import "./App.css";
import SendIcon from "@material-ui/icons/Send";
import { FormControl, Input, InputLabel, IconButton } from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [screenheight, setScreenheight] = useState(0);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        ); /// Powerful code in firestore db
        window.scrollTo(0,document.body.scrollHeight);
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []);

  /*useEffect(() => {
    setScreenheight(document.body.scrollHeight);
    window.scrollTo(0,document.body.scrollHeight);
  }, [screenheight]);*/

  //console.log("Input >> " + input);
  //console.log("Messages >>" + messages);

  console.log("Username -->> " + username);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
    setScreenheight(document.body.scrollHeight);
    window.scrollTo(0,document.body.scrollHeight);
  };

  return (
    <div className="app">
      <div className="app__header">
        <img
          src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=70&h=70"
          alt="messengerLogo"
        />
        <h2>Hi {username}!</h2>
      </div>

      <form className="app__form">
        <FormControl className="app__formNext">
          <Input
            className="app__input"
            value={input}
            placeholder="Enter your message"
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            disabled={!input}
            variant="contained"
            type="submit"
            color="primary"
            className="app__iconButton"
            onClick={sendMessage}
          >
            <SendIcon className="app__sendButton" />
          </IconButton>
        </FormControl>
      </form>

      <div className="chat__MessagesOuter">
        <div className="chat__messages">
          <FlipMove>
            {messages.map(({ id, message }) => (
              <Message key={id} message={message} username={username} />
            ))}
          </FlipMove>
        </div>
      </div>

      {/* message themselves */}
    </div>
  );
}

export default App;
