import React from "react";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { googleLogout } from "@react-oauth/google";
import "../Components/CSS/botLogin.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import "../Components/CSS/Chat.css";

function Chat() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const [profile, setProfile] = useState([]);
  const [chatbot, setChatbot] = useState("");
  const [showchat, showChat] = useState([]);
  const [limit, setLimit] = useState(0);
  const bottomRef = useRef(null);
  

  const SendChat = () => {
    if (!chatbot || chatbot == "") {
      Toast.fire({
        icon: "error",
        title: "chưa nhập dữ liệu",
      });
    } else {
      axios
        .post(
          "https://students.trungthanhweb.com/api/sendchat?id=" +
          localStorage.getItem("id") +
          "&mess=" +
          chatbot
        ).then(loadChat()).then(setChatbot(''))
    }
  };

  const Send = () => {
    setLimit(limit + 2);
    SendChat()
  };

  const loadChat = () => {
    axios
      .get(
        "https://students.trungthanhweb.com/api/loadchat?id=" +
        localStorage.getItem("id")
      )
      .then((res) => {
        showChat(res.data);
      });
  };

  const logOut = () => {
    googleLogout();
    setProfile(null);
    localStorage.clear('id')
    window.location.replace('/')
  };

  useEffect(() => {
    loadChat();
  }, [limit]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'instant'});
  }, [showchat]);
  return (
    <div className="background">

      <button onClick={logOut}>Đăng xuất</button>
        <h1 className="h1">Chat Bot</h1>
      <Container className="Container">
        <h2 className="name">Bot</h2>
        <div className="chat">
          {showchat &&
            showchat.map((showchat, index) => (
              <div className="div" key={index}>
                <div className="user">
                  <h3>{showchat.question}</h3>
                </div>
                <div className="bot">
                  <h3>{showchat.response}</h3>
                </div>
              </div>
            ))}
            <div ref={bottomRef}></div>
        </div>
        <div className="bottom">
          <input
            className="chatbox"
            type="text"
            placeholder="Chat với Bot"
            value={chatbot}
            onChange={(e) => setChatbot(e.target.value)}
          />
          <button
            className="send"
            type="submit"
            onClick={() => {
              Send();
            }}
          >
            Gửi
          </button>
        </div>
      </Container>
    </div>
  );
}

export default Chat;
