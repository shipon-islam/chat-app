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
import { useState } from "react";
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
    name: "About",
    endpoint: "/",
  },
  {
    id: 4,
    name: "Contact",
    endpoint: "/contact",
  },
];
export default function Headers() {
  const [session] = useState<SessionType>(getSession());
  const { theme, themeHandler, user } = UseCustomeContext();
  const navigate = useNavigate();

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
          <h1 className="capitalize font-black text-lg first-letter:text-red-600 first-letter:text-[1.4rem]">
            real chat
          </h1>
        </div>
        <ul className="flex items-center gap-x-8 font-medium ">
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
