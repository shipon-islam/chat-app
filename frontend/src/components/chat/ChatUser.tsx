import { dbUserType } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function ChatUser({
  user,
  handleUserId,
}: {
  user: dbUserType;
  handleUserId: (id: string) => void;
}) {
  return (
    <li
      onClick={() => handleUserId(user?._id)}
      className=" cursor-pointer hover:bg-slate-900/30 pl-2 py-3 rounded-xl"
    >
      <div className="flex  gap-x-2 items-center relative">
        <Avatar>
          <AvatarImage
            src={user?.avatar?.url}
            className="w-7 h-7 object-cover rounded-full border border-white "
          />
          <AvatarFallback>{user?.username.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <span
          className={`w-2 h-2 ${
            user.status === "ofline" ? "bg-red-600" : "bg-green-600"
          }  rounded-full absolute border border-gray-400 -top-0 left-6`}
        ></span>
        <h5 className="text-sm">{user?.username}</h5>
      </div>
    </li>
  );
}
