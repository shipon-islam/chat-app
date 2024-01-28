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

export interface Avatar {
  url: string;
  public_id: string;
}
