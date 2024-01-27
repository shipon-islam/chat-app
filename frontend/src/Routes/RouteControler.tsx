import { getSession } from "@/actions/userAction";
import { isTokenExpired } from "@/lib/JwtExpired";
import Chat from "@/pages/Chat";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectRoutes from "./ProtectRoutes";

export default function RouteControler() {
  const session = getSession();
  useEffect(() => {
    if (isTokenExpired(session.token)) {
      localStorage.removeItem("session");
    }
  }, [session]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<ProtectRoutes />}>
        <Route path="chat" element={<Chat />} />
      </Route>
    </Routes>
  );
}
