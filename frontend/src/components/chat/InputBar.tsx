import { socket } from "@/lib/socket";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
type InputBarType = {
  handleClick: (value: string) => void;
  selectedUser: string;
};
export default function InputBar({ handleClick, selectedUser }: InputBarType) {
  // const [attachment, setAttachment] = useState<FileList | null>();
  const fileRef = useRef<HTMLInputElement>(null);
  const [newMessage, setNewMessage] = useState("");
  const handleMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    socket.emit("start typing", selectedUser);
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      socket.emit("stop typing", selectedUser);
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [newMessage, selectedUser]);

  return (
    <div className="absolute bottom-0 right-0 bg-background w-full">
      <div className="flex">
        <button onClick={() => fileRef.current?.click()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
            />
          </svg>
        </button>
        <input
          ref={fileRef}
          type="file"
          hidden
          // onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
          //   setAttachment(target.files)
          // }
        />
        <Input
          className="rounded-none  border-0 focus-visible:ring-0"
          type="text"
          value={newMessage}
          placeholder="message..."
          onChange={handleMessage}
        />
        <Button
          onClick={() => {
            handleClick(newMessage);
            setNewMessage(" ");
          }}
          className="rounded-none "
        >
          Send
        </Button>
      </div>
    </div>
  );
}
