import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { UseCustomeContext } from "@/context/ContextProvider";
import { getSession } from "@/lib/helpers";
import { SessionType } from "@/types/user";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const navbar_links = [
  {
    id: 1,
    name: "Home",
    endpoint: "/",
  },
  {
    id: 2,
    name: "Chat",
    endpoint: "/chat",
  },
  {
    id: 3,
    name: "Support",
    endpoint: "/support",
  },
  {
    id: 4,
    name: "Terms",
    endpoint: "/terms",
  },
];
export default function Headers() {
  const [session] = useState<SessionType>(getSession());
  const { theme, themeHandler, user } = UseCustomeContext();
  const [isShow, setIsShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleBtn = () => {
    btnRef.current?.classList.toggle("active");
    setIsShow((prev) => !prev);
  };

  //for logout controler
  const handleLogout = () => {
    window.localStorage.removeItem("session");
    navigate("/login");
    window.location.reload();
  };

  return (
    <header className="bg-secondary text-secondary-foreground py-1.5">
      <nav className="flex flex-wrap justify-between items-center container">
        <div>
          <h1 className="capitalize font-black text-2xl md:text-lg first-letter:text-red-600 md:first-letter:text-[1.4rem] first-letter:text-[1.8rem]  py-3.5">
            real chat
          </h1>
        </div>
        <div className="flex gap-x-4 items-center md:hidden">
          <Switch
            checked={theme === "dark" ? true : false}
            onClick={() => themeHandler(theme)}
          />

          <button onClick={handleBtn} ref={btnRef} className="hamburger-btn">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <ul
          className={`${
            isShow ? "scale-1" : "scale-0 "
          } md:hidden absolute bg-secondary w-full left-0 top-16 px-9 space-y-10 font-bold  pt-10 pb-14 transition-transform duration-500  origin-top-right z-50`}
        >
          {session?.token && (
            <li className=" flex items-center gap-x-2 bg-gray-700/20 py-2 px-2 rounded">
              <Avatar className="h-9 w-9 border border-gray-900 dark:border-gray-400">
                <AvatarImage src={user?.avatar?.url} />
                <AvatarFallback className="uppercase">
                  {user?.username.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <span className="capitalize font-medium">{user?.username}</span>
            </li>
          )}
          {navbar_links.map((link) => (
            <li key={link.id} onClick={handleBtn}>
              <Link
                className="hover:text-primary transition-colors duration-300"
                to={link.endpoint}
              >
                {link.name}
              </Link>
            </li>
          ))}
          {session?.token ? (
            <li className="">
              <Button size="lg" onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            </li>
          ) : (
            <li onClick={handleBtn}>
              <Link to="/login">
                <Button size="lg" className="font-bold">
                  Login
                </Button>
              </Link>
            </li>
          )}
        </ul>
        {/* for bigger screen */}
        <ul className="items-center gap-x-8 font-medium hidden md:flex">
          {navbar_links.map((link) => (
            <li key={link.id}>
              <Link
                className="hover:text-primary transition-colors duration-300"
                to={link.endpoint}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Switch
              checked={theme === "dark" ? true : false}
              onClick={() => themeHandler(theme)}
            />
          </li>
          {session.token ? (
            <li>
              <Popover>
                <PopoverTrigger>
                  <Avatar>
                    <AvatarImage src={user?.avatar?.url} />
                    <AvatarFallback className="uppercase">
                      {user?.username.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                  <ul className="space-y-4">
                    <li className="cursor-pointer hover:bg-primary/10 px-5 py-1 rounded-md">
                      Profile
                    </li>
                    <li className="cursor-pointer hover:bg-primary/10 px-5 py-1 rounded-md">
                      Dashboard
                    </li>
                    <li className="cursor-pointer hover:bg-primary/10 px-5 py-1 rounded-md">
                      Settings
                    </li>
                    <li className="px-5">
                      <Button onClick={handleLogout} variant="destructive">
                        Logout
                      </Button>
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
