/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import "./chat.scss";
import { authContext } from "../../../context/auth";
import { apiRequest } from "../../lib/apiRequest";
import { format } from "timeago.js";
import { socketCtx } from "../../../context/socket";
import { useEffect, useRef } from "react";

const Chat = ({ chats }) => {
  const [chat, setChat] = useState(null);

  const { currentUser } = useContext(authContext);

  const { socket } = useContext(socketCtx);

  const scrollRef = useRef();

  const handleOpenChat = async (id, reciver) => {
    try {
      const res = await apiRequest.get("chats/" + id);
      setChat({ ...res.data, reciver });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const text = formData.get("text");

    if (!text) return;

    try {
      const res = await apiRequest.post("message/" + chat.id, { text });

      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();

      socket.emit("sendMessage", {
        recId: chat.reciver.id,
        data: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const readChat = async () => {
      await apiRequest.put("chats/read/" + chat.id, { text });
    };

    if (chat && socket) {
      socket.on("getMessage", ({ reciverId, data }) => {
        if (reciverId === chat.id) {
          setChat((prev) => ({
            ...prev,
            messages: [...prev.messages, data],
          }));

          readChat();
        }
      });
    }

    return () => {
      socket.off("getMessage");
    };
  }, [socket]);

  useEffect(() => {
    chat && scrollRef?.current.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>

        {/* Message Single */}

        {chats?.map((c) => (
          <div
            key={c.id}
            className="message"
            style={{
              backgroundColor:
                c.seenBy.includes(currentUser.id) || chat?.id === c.id
                  ? "white"
                  : "#fecd514e",
            }}
            onClick={() => handleOpenChat(chat.id, chat.reciver)}
          >
            <img
              src={chat.reciver.avatar || "/favicon.png"}
              alt="messages Profile user"
            />
            <div>
              <span>{chat.reciver.username}</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.reciver.avatar || "/favicon.png"} alt="profile" />
              {chat.reciver.username}
              <span className="close" onClick={() => setChat((pre) => !pre)}>
                X
              </span>
            </div>
          </div>
          <div className="center">
            {chat.messages.map((message) => {
              return (
                <div
                  key={message.id}
                  className={`chatMessage ${
                    currentUser.id === message.userId && "own"
                  }`}
                >
                  <p>{message.text}</p>
                  <span>{format(message.createdAt)}</span>
                </div>
              );
            })}

            <div ref={scrollRef}></div>
          </div>
          <div className="bottom">
            <form onSubmit={handleSendForm}>
              <textarea name="text" id="text"></textarea>
              <button>Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
