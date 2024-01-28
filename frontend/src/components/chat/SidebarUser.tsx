import { createConversation, getConversation } from "@/actions/userAction";
import { UseCustomeContext } from "@/context/ContextProvider";
import { Axios } from "@/lib/Axios";
import { conversationType, selectHanderType } from "@/types/conversation";
import { dbUserType } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Input } from "../ui/input";
import ChatUser from "./ChatUser";
type SidebarTypes = {
  handleConversation: (value: selectHanderType) => void;
};
export default function SidebarUser({ handleConversation }: SidebarTypes) {
  const { user } = UseCustomeContext();
  const ulContainerRef = useRef<HTMLUListElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchUsers, setSearchUsers] = useState<dbUserType[]>([]);
  const { data: conversations } = useQuery("conversation", getConversation);
  const fetchData = async (searchQuery: string) => {
    try {
      const { data } = await Axios(`/api/user?q=${searchQuery}`);
      setSearchUsers(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSeletor = ({ currentTarget }: MouseEvent<HTMLLIElement>) => {
    const container = Array.from(
      ulContainerRef.current?.childNodes || []
    ).filter((node): node is HTMLElement => node instanceof HTMLElement);
    for (const item of container) {
      item.classList.remove("bg-slate-900/30");
    }
    currentTarget.classList.add("bg-slate-900/30");
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData(searchValue);
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);
  return (
    <div className=" max-w-[12rem] border-r border-gray-700 h-full py-2 px-3">
      <div className="flex w-full max-w-sm items-center space-x-2 ">
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
          type="search"
          placeholder="Search"
        />
      </div>
      <h1 className="capitalize text-sm pt-5 pb-2 pl-2 border-b border-gray-700">
        active
      </h1>
      {searchUsers.length <= 0 ? (
        <ul className="mt-5" ref={ulContainerRef}>
          {conversations?.data?.map((conversation: conversationType) => {
            const { _id, members } = conversation;
            const receiver = members.find(
              (member: dbUserType) => member._id !== user._id
            );

            return (
              <li
                key={_id}
                onClick={(e: MouseEvent<HTMLLIElement>) => {
                  handleSeletor(e);
                  handleConversation({
                    conversationId: _id,
                    receiverId: receiver?._id as string,
                    receiverName: receiver?.username as string,
                  });
                }}
                className={`cursor-pointer hover:bg-slate-900/30 pl-2 py-3 rounded-xl`}
              >
                <div className="flex  gap-x-2 items-center relative">
                  <Avatar>
                    <AvatarImage
                      src={receiver?.avatar?.url}
                      className="w-7 h-7 object-cover rounded-full border border-white "
                    />
                    <AvatarFallback className="uppercase">
                      {receiver?.username.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={`w-2 h-2 ${
                      receiver?.status === "ofline"
                        ? "bg-red-600"
                        : "bg-green-600"
                    }  rounded-full absolute border border-gray-400 -top-0 left-6`}
                  ></span>
                  <h5 className="text-sm">{receiver?.username}</h5>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="mt-5">
          {searchUsers.map((user) => (
            <ChatUser
              handleUserId={createConversation}
              key={user._id}
              user={user}
            />
          ))}
        </ul>
      )}
    </div>
  );
}