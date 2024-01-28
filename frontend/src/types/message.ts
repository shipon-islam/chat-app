import { dbUserType } from "./user";

export type messageType = {
  _id: string;
  message: string;
  sender: dbUserType;
  conversation: string;
};
