import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Default from "../components/layout/Default";
import { getStorage } from "../services/LocalStorage";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const activeUser = getStorage("__user__", "object");

  if (!activeUser){
    window.location.href = "/login";
    return null;
  }

  return (
    <Default>
      <Outlet />
    </Default>
  );
};

export default ProtectedRoute;
