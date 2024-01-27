import { getTheme } from "@/actions/userAction";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
type ThemeType = "dark" | "light";
type ThemeProviderType = {
  theme: ThemeType;
  themeHandler: (themetype: ThemeType) => void;
  setSelectUser: (id: string) => void;
  selectedUser: string;
};
const contextValue: ThemeProviderType = {
  theme: "light",
  themeHandler: () => null,
  setSelectUser: () => null,
  selectedUser: "",
};
const ThemeContext = createContext<ThemeProviderType>(contextValue);
export const UseTheme = () => useContext(ThemeContext);

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>(getTheme());
  const [selectedUser, setSelectedUser] = useState("");
  const themeHandler = (themetype: string) => {
    setTheme(themetype === "light" ? "dark" : "light");
  };
  const setSelectUser = (id: string) => {
    setSelectedUser(id);
  };
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);
  return (
    <ThemeContext.Provider
      value={{ theme, themeHandler, selectedUser, setSelectUser }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
