import { getUserById } from "@/actions/userAction";
import { getSession, getTheme } from "@/lib/helpers";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "react-query";
import { ThemeType, contextValue, contextValueType } from "./initalState";
const session = getSession();
const ThemeContext = createContext<contextValueType>(contextValue);

export const UseCustomeContext = () => useContext(ThemeContext);

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>(getTheme());
  const { data } = useQuery(["user", session?.id], () =>
    getUserById(session?.id)
  );

  const themeHandler = (themetype: ThemeType) => {
    setTheme(themetype === "light" ? "dark" : "light");
  };
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const contextValue = {
    theme,
    themeHandler,
    user: data?.data,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
