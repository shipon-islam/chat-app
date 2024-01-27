import { getSession } from "@/actions/userAction";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectRoutes() {
  const session = getSession();
  return session.token ? <Outlet /> : <Navigate to="/login" />;
}
