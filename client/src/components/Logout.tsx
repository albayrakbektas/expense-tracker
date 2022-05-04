import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/userActions";
import { AppState } from "../store";
import { Navigate } from "react-router-dom";

function Logout() {
  const { data } = useSelector((state: AppState) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(logout());
  }, []);

  console.log(data.username);

  if (!data.username) {
    return <Navigate to={"/login"} />;
  }

  return <div>Logging out...</div>;
}

export default Logout;
