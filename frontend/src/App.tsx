import React, { useEffect, useState } from "react";
import { socket } from "./socket";
type MessageT = {
  message: string;
  user: string;
};
const ChatApp = () => {
  const [messages, setMessages] = useState<MessageT[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.on("chat message", (data) => {
      setMessages((prevMessages: MessageT[]) => [...prevMessages, data]);
    });
    socket.on("load messages", (data) => {
      setMessages(data);
    });
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      socket.emit("chat message", {
        user: "shipon islam",
        message: newMessage,
      });
      setNewMessage("");
    }
  };

  return (
    <div>
      <div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.user}:</strong> {msg.message}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewMessage(e.target.value)
          }
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
