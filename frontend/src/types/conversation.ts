import { dbUserType } from "./user";

export type conversationType = {
  _id: string;
  members: dbUserType[];
};
export interface selectHanderType {
  conversationId: string;
  receiverId: string;
  receiverName: string;
}
export interface selectedChatType extends selectHanderType {
  avatar: string;
}
