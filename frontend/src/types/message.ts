import { dbUserType } from "./user";

export interface messageType {
  _id: string;
  message: string;
  sender: dbUserType;
  conversation: string;
}
export interface socMessageType extends messageType {
  image: string;
}
export type sendMessageType = {
  text: string;
  attachment: FileList | null;
};
