export interface SessionType {
  id: string;
  token: string;
}
export interface UserRegisterType {
  username: string;
  email: string;
  password: string;
  cpassword: string;
  avatar?: FileList | undefined;
}

export interface dbUserType {
  avatar: Avatar;
  createdAt: Date;
  email: string;
  password: string;
  role: string;
  status: string;
  updatedAt: Date;
  username: string;
  _id: string;
}
export type messageType = {
  _id: string;
  receiver: dbUserType;
  message: string;
  sender: dbUserType;
  conversation: string;
};

export interface Avatar {
  url: string;
  public_id: string;
}
export type conversationType = {
  _id: string;
  members: dbUserType[];
};
export interface selectHander {
  conversationId: string;
  receiverId: string;
  receiverName: string;
}
export interface selectedChatType extends selectHander {
  avatar: string;
}
