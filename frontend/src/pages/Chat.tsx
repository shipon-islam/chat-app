import InputBar from "@/components/chat/InputBar";
import SidebarUser from "@/components/chat/SidebarUser";
import { UseCustomeContext } from "@/context/ContextProvider";
import { Axios } from "@/lib/Axios";
import { socket } from "@/lib/socket";
import { selectHanderType, selectedChatType } from "@/types/conversation";
import { sendMessageType, socMessageType } from "@/types/message";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState<socMessageType[]>([]);
  const [typing, setTyping] = useState<{
    userId: string;
    isTyping: boolean;
  }>();
  const [selectedChat, setSelectedChat] = useState<selectedChatType>();
  const chatContainerRef = useRef<HTMLUListElement>(null);
  const { user } = UseCustomeContext();
  const handleClick = (value: sendMessageType) => {
    if (selectedChat) {
      if (value.attachment) {
        const file = value.attachment[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          socket.emit("send message", {
            ...selectedChat,
            message: value?.text,
            attachment: reader.result,
            senderId: user._id,
          });
        };
      } else {
        if (!value.text) return;
        socket.emit("send message", {
          ...selectedChat,
          message: value?.text,
          senderId: user._id,
        });
      }
    }
  };
  const handleConversation = async (value: selectHanderType) => {
    const { data } = await Axios.get(`/api/message/${value.conversationId}`);
    const avatar = user?.avatar?.url;
    setSelectedChat({ ...value, avatar });
    if (data.success) {
      setMessages(data.data);
      0;
    }
  };
  useEffect(() => {
    socket.on("load message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, []);

  useEffect(() => {
    socket.emit("add user", user?._id);
    socket.on("get users", (users) => console.log(users));
  }, [user]);
  useEffect(() => {
    socket.on("typing", (typing) => {
      setTyping(typing);
    });
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-[75vh] sm:min-h-screen">
      <div className="sm:w-[35rem] h-[30rem] bg-secondary mx-1 sm:mx-auto mt-8  mb-8 sm:mb-0 rounded-md border border-gray-700 flex overflow-hidden ">
        <SidebarUser handleConversation={handleConversation} />
        {selectedChat ? (
          <div className="basis-full relative pb-4 pr-4 overflow-hidden">
            <div className=" bg-gray-200 border dark:bg-slate-900 absolute top-0 w-full z-10 py-2">
              <p className="pl-4 capitalize text-sm">
                {selectedChat?.receiverName}
              </p>
            </div>
            <ul
              className={`absolute bottom-12 w-full left-0 px-4 overflow-y-auto max-h-full pt-10`}
              ref={chatContainerRef}
            >
              {messages.map((messageList) => {
                const { sender, message, _id, image } = messageList;
                return (
                  <li
                    key={_id}
                    className={`flex  ${
                      sender?._id === user._id ? "justify-end" : "justify-start"
                    } gap-x-1 new-message my-2 `}
                  >
                    <Avatar>
                      <AvatarImage
                        src={sender?.avatar?.url}
                        className="w-6 h-6 object-cover rounded-full border border-white "
                      />
                      <AvatarFallback>
                        {sender?.username?.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      style={{ borderRadius: `0 1rem 1rem 1rem` }}
                      className="dark:bg-slate-900 bg-slate-900/30 px-3 py-2 text-sm"
                    >
                      {image && (
                        <img
                          className="max-w-20 sm:max-w-24 "
                          src={image}
                          alt="dsfds"
                        />
                      )}
                      <p>{message}</p>
                    </div>
                  </li>
                );
              })}
              <li>
                {typing?.isTyping
                  ? typing.isTyping && (
                      <div className="flex items-center height-[17px] pb-4">
                        <div
                          style={{ animationDelay: "200ms" }}
                          className=" bg-gray-500 inline-block h-1.5 w-1.5 mr-1.5 rounded-sm animate-typing-dot"
                        ></div>
                        <div
                          style={{ animationDelay: "300ms" }}
                          className=" bg-gray-500 inline-block h-1.5 w-1.5 mr-1.5 rounded-sm animate-typing-dot"
                        ></div>
                        <div
                          style={{ animationDelay: "400ms" }}
                          className=" bg-gray-500 inline-block h-1.5 w-1.5 mr-1.5 rounded-sm animate-typing-dot"
                        ></div>
                      </div>
                    )
                  : ""}
              </li>
            </ul>
            <InputBar
              handleClick={handleClick}
              selectedUser={selectedChat?.receiverId}
            />
          </div>
        ) : (
          <div className="h-full basis-full relative">
            <h1 className="w-[60%] capitalize  font-bold text-xl text-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2">
              select your friend to see conversation
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
