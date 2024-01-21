import { io } from "socket.io-client";

const URL = "https://chat-simple-app.onrender.com/";

export const socket = io(URL);
