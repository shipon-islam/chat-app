import { getSession } from "@/actions/userAction";
import InputBar from "@/components/chat/InputBar";
import SidebarUser from "@/components/chat/SidebarUser";
import { Axios } from "@/lib/Axios";
import { socket } from "@/lib/socket";
import { messageType, selectHander, selectedChatType } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState<messageType[]>([]);
  const [isScroll, setIsScroll] = useState(false);
  const [selectedChat, setSelectedChat] = useState<selectedChatType>();
  const chatContainerRef = useRef<HTMLUListElement>(null);
  const session = getSession();
  const handleClick = (value: string) => {
    if (selectedChat && session) {
      socket.emit("send message", {
        ...selectedChat,
        message: value,
        senderId: session.id,
      });
    }
  };
  const handleConversation = async (value: selectHander) => {
    const { data } = await Axios.get(`/api/message/${value.conversationId}`);
    const { data: currentUser } = await Axios.get(`/api/user/${session.id}`);
    const avatar = currentUser?.data?.avatar?.url;

    setSelectedChat({ ...value, avatar });
    if (data.success) {
      setMessages(data.data);
    }
  };
  useEffect(() => {
    socket.on("load message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, []);

  useEffect(() => {
    socket.emit("add user", session?.id);
    socket.on("get users", (users) => console.log(users));
  }, [session]);

  useEffect(() => {
    if (
      chatContainerRef.current &&
      chatContainerRef.current?.clientHeight >= 400
    ) {
      setIsScroll(true);
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen">
      <div className="w-[35rem] h-[30rem] bg-secondary mx-auto mt-8 rounded-md border border-gray-700 flex overflow-hidden">
        <SidebarUser handleConversation={handleConversation} />
        {selectedChat ? (
          <div className="basis-full relative pb-4 pr-4 overflow-hidden">
            <div className=" bg-slate-900 absolute top-0 w-full z-10 py-2">
              <p className="pl-4 capitalize text-sm">
                {selectedChat?.receiverName}
              </p>
            </div>
            <ul
              className={`absolute bottom-12 w-full left-0 px-4 ${
                isScroll ? "overflow-y-scroll" : " "
              }  max-h-full pt-10`}
              ref={chatContainerRef}
            >
              {messages.map((messageList) => {
                const { sender, message, _id } = messageList;
                return (
                  <li
                    key={_id}
                    className={`flex  ${
                      sender?._id === session.id
                        ? "justify-end"
                        : "justify-start"
                    } gap-x-1 new-message my-2 `}
                  >
                    <Avatar>
                      <AvatarImage
                        src={sender?.avatar?.url}
                        className="w-6 h-6 object-cover rounded-full border border-white "
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div
                      style={{ borderRadius: `0 1rem 1rem 1rem` }}
                      className="bg-slate-900 px-3 py-2 text-sm"
                    >
                      <p>{message}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <InputBar handleClick={handleClick} />
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
