import { io } from "socket.io-client";
import { baseURL } from "./Axios";
export const socket = io(baseURL);
