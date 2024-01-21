import { useEffect, useState } from "react";
import { socket } from "./socket";
const ChatApp = () => {
  const [messages, setMessages] = useState<
    {
      message: string;
      user: string;
    }[]
  >([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.on("chat message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
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
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
