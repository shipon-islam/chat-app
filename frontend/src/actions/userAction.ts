import { Axios } from "@/lib/Axios";
import { loginSchema } from "@/zod/usersSchema";
import { z } from "zod";
//call all api
export const loginAction = async (creadential: z.infer<typeof loginSchema>) => {
  const { data } = await Axios.post("/api/login", creadential);
  return data;
};
export const registerAction = async (user: FormData) => {
  const { data } = await Axios.post("/api/user", user);
  return data;
};
export const getUsers = async () => {
  const { data } = await Axios("/api/user");
  return data;
};
export const getConversation = async () => {
  const { data } = await Axios(`/api/conversation`);
  return data;
};
export const getUserById = async (id: string) => {
  if (id) {
    const { data } = await Axios(`/api/user/${id}`);
    return data;
  }
  return {};
};
export const createConversation = async (id: string) => {
  const { data } = await Axios.post("/api/conversation", {
    receiverId: id,
  });
  if (data.success) {
    location.reload();
  }
};
