import { dbUserType } from "@/types/user";
export type ThemeType = "dark" | "light";
export type contextValueType = {
  theme: ThemeType;
  themeHandler: (themeType: ThemeType) => void;
  user: dbUserType;
};
export const contextValue: contextValueType = {
  theme: "dark",
  themeHandler: () => null,
  user: {
    avatar: { url: "", public_id: "" },
    email: "",
    password: "",
    role: "",
    status: "",
    updatedAt: new Date(),
    createdAt: new Date(),
    username: " ",
    _id: "",
  },
};
